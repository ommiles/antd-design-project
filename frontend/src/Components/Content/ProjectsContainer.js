import { TableContainer } from './TableContainer';

export const ProjectsContainer = () => {
  return (
    <section
      className='site-layout-background'
      style={{ padding: 24, minHeight: 380, height: '80%', overflow: 'scroll' }}
    >
      <div style={{ paddingBottom: 24 }}>My Projects</div>
      <TableContainer />
    </section>
  );
};
