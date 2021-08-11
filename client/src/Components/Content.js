import { Layout } from 'antd';
import { Banner } from './Content/Banner';
import { ProjectsContainer } from './Content/ProjectsContainer';

export const Content = () => {
  const { Content } = Layout;

  return (
    <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64 }}>
      <Banner />
      <ProjectsContainer />
    </Content>
  );
};
