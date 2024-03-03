import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/main-page'
import HeaderComponent from './components/Layout/Header/Header'
import { Layout } from 'antd'
import TasksPage from './pages/tasks-page'
import FooterComponent from './components/Layout/Footer/Footer'
import TaskPage from './pages/task-page'
import Login from './pages/login-page'
import { IUser, setLoadingType } from './types'
import { useSelector } from 'react-redux'
import { currentUserSelector } from './selectors/usersSelectors'
import React, { useEffect } from 'react'
import { AppDispatch } from './redux/redux-store'
import { useDispatch } from 'react-redux'
import { CheckAuthAC } from './redux/actions/usersActions/usersActions'
import Register from './pages/register-page'
import UserPage from './pages/user-page'
import GeneratorPage from './pages/generator-page'
import VariantPage from './pages/variant-page'
import { withLoader } from './hoc/withLoader'
import NotFoundPage from './pages/not-found-page'

const { Content } = Layout

type PropsType = {
    isLoading: boolean
    setIsLoading: setLoadingType
}

const App: React.FC<PropsType> = ({ isLoading, setIsLoading }): JSX.Element => {
    const user: IUser = useSelector(currentUserSelector)

    const dispatch: AppDispatch = useDispatch()

    const TasksWithLoader = withLoader(TasksPage)
    const VariantPageWithLoader = withLoader(VariantPage)
    const TaskPageWithLoader = withLoader(TaskPage)
    const GeneratorPageWithLoader = withLoader(GeneratorPage, false)

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(CheckAuthAC(setIsLoading))
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <BrowserRouter basename="/">
            <div className="App">
                <Layout className="grid-layout">
                    <HeaderComponent
                        isLoading={isLoading}
                        userId={user.id}
                        username={user.username}
                    />
                    <Content
                        className="container"
                        style={{ gridArea: 'content' }}
                    >
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route
                                path="/profile/:userId"
                                element={
                                    <UserPage
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                }
                            />
                            <Route path="/auth" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/tasks"
                                element={<TasksWithLoader />}
                            />
                            <Route
                                path="/task/:id"
                                element={<TaskPageWithLoader />}
                            />
                            <Route
                                path="/generator"
                                element={<GeneratorPageWithLoader />}
                            />
                            <Route
                                path="/variant"
                                element={<VariantPageWithLoader />}
                            />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Content>
                    <FooterComponent />
                </Layout>
            </div>
        </BrowserRouter>
    )
}

export default App
