import { DashboardStyles } from "./style"


export function Dashboard({ marginLeft }){
    return (
        <DashboardStyles marginLeft={marginLeft}>
            <h1>Bem vindo ao Dashboard</h1>
        </DashboardStyles>
    )
}