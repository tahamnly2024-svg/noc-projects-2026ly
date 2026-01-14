import React, { useState, useMemo } from 'react';

import { rawProjects, getRegion } from './data';
import { FilterState, Project } from './types';

import SectorHighlights from './components/SectorHighlights';
import RegionalStats from './components/RegionalStats';
import ChartsSection from './components/ChartsSection';
import FilterSection from './components/FilterSection';
import ProjectsTable from './components/ProjectsTable';

const App: React.FC = () => {

  const [projects, setProjects] = useState<Project[]>(rawProjects);

  const [filters, setFilters] = useState<FilterState>({
    region: '',
    sector: '',
    municipality: '',
    searchNotes: '',
    searchName: '',
    valueFilter: ''
  });

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

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newProj: Project = {
      id: Date.now(),
      name: formData.get('name') as string,
      value: formData.get('value') ? Number(formData.get('value')) : null,
      municipality: formData.get('municipality') as string,
      region: getRegion(formData.get('municipality') as string, ''),
      sector: formData.get('sector') as string,
      beneficiary: formData.get('beneficiary') as string,
      notes: formData.get('notes') as string,
    };

    setProjects(prev => [newProj, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <FilterSection filters={filters} setFilters={setFilters} projects={projects} />

      <div className="p-6 space-y-16">

        <RegionalStats projects={filteredProjects} />
        <SectorHighlights projects={filteredProjects} />
        <ChartsSection projects={filteredProjects} />

        <ProjectsTable
          projects={filteredProjects}
          onDelete={handleDeleteProject}
          onEdit={() => {}}
        />
      </div>
    </div>
  );
};

export default App;
