import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import {MessageProvider} from "./contexts/messagecontext";
import {AuthenticationProvider} from "./contexts/authenticationcontext";
import {IconContext} from "react-icons";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage";
import {SignupPage} from "./pages/auth/SignupPage";
import {BookListPage} from "./pages/book/BookListPage";
import {AppNavbar} from "./components/AppNavbar";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {MessageBar} from "./components/ui/MessageBar";
import {BookCreatePage} from "./pages/book/BookCreatePage";
import {BookViewPage} from "./pages/book/BookViewPage";
import {BookEditPage} from "./pages/book/BookEditPage";
import {Container} from "react-bootstrap";
import {AuthorViewPage} from "./pages/author/AuthorViewPage";
import {AuthorListPage} from "./pages/author/AuthorListPage";
import {AuthorCreatePage} from "./pages/author/AuthorCreatePage";
import {AuthorEditPage} from "./pages/author/AuthorEditPage";

const queryClient = new QueryClient();

function MainLayout() {
    return (
        <>
            <AppNavbar/>
            <Container fluid className="position-relative mt-2" style={{marginBottom: 70}}>
                <Outlet/>
            </Container>
            <ReactQueryDevtools initialIsOpen/>
            <MessageBar/>
        </>
    )
}

function ProvidedApp() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<BookListPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="signup" element={<SignupPage/>}/>
                        <Route path="books">
                            <Route index element={<BookListPage/>}/>
                            <Route path="view/:id" element={<BookViewPage/>}/>
                            <Route path="edit/:id" element={<BookEditPage/>}/>
                            <Route path="new" element={<BookCreatePage/>}/>
                        </Route>
                        <Route path="authors">
                            <Route index element={<AuthorListPage/>}/>
                            <Route path="view/:id" element={<AuthorViewPage/>}/>
                            <Route path="edit/:id" element={<AuthorEditPage/>}/>
                            <Route path="new" element={<AuthorCreatePage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function App() {
    return (
        <IconContext.Provider value={{className: "icons-global-class-name"}}>
            <MessageProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthenticationProvider>
                        <ProvidedApp/>
                    </AuthenticationProvider>
                </QueryClientProvider>
            </MessageProvider>
        </IconContext.Provider>
    );

}

export default App;
