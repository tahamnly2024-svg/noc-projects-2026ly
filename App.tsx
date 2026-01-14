import React, { useState, useMemo, useRef, useEffect } from 'react';

import ReportLayout from './components/ReportLayout';
import OverviewSection from './components/OverviewSection';
import StatsGrid from './components/StatsGrid';
import SectorHighlights from './components/SectorHighlights';
import RegionalStats from './components/RegionalStats';
import ChartsSection from './components/ChartsSection';
import FilterSection from './components/FilterSection';
import ProjectsTable from './components/ProjectsTable';
import { DownloadIcon, FileIcon, PresentationIcon } from './components/Icons';

import { getRegion } from './data';
import { addProject, getProjects, deleteProject } from './src/services/projects';
import { FilterState, Project } from './types';

declare const PptxGenJS: any;

const App: React.FC = () => {

  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    region: '', sector: '', municipality: '', searchNotes: '', searchName: '', valueFilter: ''
  });

  useEffect(() => {
    const load = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    load();
  }, []);

  const overviewRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const regionalRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchRegion = !filters.region || p.region === filters.region;
      const matchSector = !filters.sector || p.sector === filters.sector;
      const matchMunicipality = !filters.municipality || p.municipality === filters.municipality;
      const matchName = !filters.searchName || p.name.toLowerCase().includes(filters.searchName.toLowerCase());
      const matchNotes = !filters.searchNotes || (p.notes && p.notes.toLowerCase().includes(filters.searchNotes.toLowerCase()));

      let matchValue = true;
      if (filters.valueFilter === 'with-value') matchValue = p.value !== null;
      else if (filters.valueFilter === 'without-value') matchValue = p.value === null;

      return matchRegion && matchSector && matchMunicipality && matchName && matchNotes && matchValue;
    });
  }, [filters, projects]);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      await deleteProject(id);
      const updated = await getProjects();
      setProjects(updated);
    }
  };

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newProj = {
      name: formData.get('name') as string,
      value: formData.get('value') ? Number(formData.get('value')) : null,
      municipality: formData.get('municipality') as string,
      region: getRegion(formData.get('municipality') as string, ''),
      sector: formData.get('sector') as string,
      beneficiary: formData.get('beneficiary') as string,
      notes: formData.get('notes') as string,
    };

    await addProject(newProj);
    const updated = await getProjects();
    setProjects(updated);
    setIsModalOpen(false);
  };

  return (
    <ReportLayout sidebar={<FilterSection filters={filters} setFilters={setFilters} projects={projects} />}>
      <ProjectsTable 
        projects={filteredProjects}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />
    </ReportLayout>
  );
};

export default App;
