import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const routes: RouteObject[] = [
    {
        path: '',
        element: <App/>,
        children: [
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'createActivity', element: <ActivityForm key='create' />},
            {path: 'editActivity/:id', element: <ActivityForm key='edit' />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='/not-found' />},
            {path: '/server-error', element: <ServerError />},
        ]
    }
]

export const router = createBrowserRouter(routes)