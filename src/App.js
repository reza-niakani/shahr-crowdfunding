/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import './App.css';
import RoutsComponent from 'comon/Routs/RoutesCompnent';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataProvider } from 'comon/context/MainContext';
import { AuthCheck } from 'comon/Routs/setting/AuthCheck';
import MainStructurePages from 'comon/pageStructures/MainStructurePages';
import ScrollToTop from 'comon/GlobalyTools/ScrollToTop';
import ErrorBoundary from 'comon/Routs/setting/ErrorBoundary';
import TimeoutFallback from 'comon/Routs/setting/TimeoutFallback';
import TitleManager from 'comon/TabTitileManager/TitileManager';

function App() {
  return (
    <React.Fragment>
      <DataProvider>
        <ToastContainer
          transition={Flip}
          position={'bottom-center'}
          rtl={true}
          onClick={() => toast.dismiss()}
          style={{ maxWidth: '90vw' }}
        />
        <AuthCheck>
          <MainStructurePages>
            <ScrollToTop />
            <ErrorBoundary>
              <Suspense fallback={<TimeoutFallback />}>
                <TitleManager />
                <RoutsComponent />
              </Suspense>
            </ErrorBoundary>{' '}
          </MainStructurePages>
        </AuthCheck>
      </DataProvider>
    </React.Fragment>
  );
}

export default App;
