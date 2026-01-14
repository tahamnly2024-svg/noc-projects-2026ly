import React, { useState, useMemo, useRef, useEffect } from 'react';

import { getRegion } from './data';
import { FilterState, Project } from './types';
import { addProject, getProjects, deleteProject } from './src/services/projects';

import SectorHighlights from './components/SectorHighlights';
import RegionalStats from './components/RegionalStats';
import ChartsSection from './components/ChartsSection';
import FilterSection from './components/FilterSection';
import ProjectsTable from './components/ProjectsTable';

declare const PptxGenJS: any;

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    region: '',
    sector: '',
    municipality: '',
    searchNotes: '',
    searchName: '',
    valueFilter: ''
  });

  useEffect(() => {
    const load = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    load();
  }, []);

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

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      await deleteProject(id);
      const updated = await getProjects();
      setProjects(updated);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <FilterSection
        filters={filters}
        setFilters={setFilters}
        projects={projects}
      />

      <div className="p-6">
        <ProjectsTable
          projects={filteredProjects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      </div>
    </div>
  );
};

export default App;
