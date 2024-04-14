import { Project, Task } from "./SchemasTypes"

export type InitialProject = {
    projects: Project | null | Project[],
    loading: boolean,
    error: string | null | unknown
}
export type InitialTask = {
    tasks: [],
    loading: boolean,
    error: string | null | unknown
}