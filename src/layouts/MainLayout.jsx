import {Outlet} from 'react-router-dom';
import NavHeader from '../components/NavHeader.jsx';

const MainLayout = () => {

    return (
        <div>
            <NavHeader/>
            <main className={'mt-16'}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;