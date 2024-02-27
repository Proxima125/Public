import { V5datatype, Projectstype } from "../../../jsonserver/types"

export async function addv5datalist(addV5data: V5datatype): Promise<V5datatype> {
    let response = await fetch('http://172.19.179.116:3001/V5data', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addV5data)
    });
    let newV5data = await response.json();
    return newV5data;
}

export async function getProjectslist(): Promise<Projectstype[]> {
    let response = await fetch(`http://172.19.179.116:3001/Projects`, {
        cache: "no-store"
    });
    let Projects = await response.json();
    return Projects;
}

export async function getNextCharCode(query: string): Promise<V5datatype[]> {
    let response = await fetch(`http://172.19.179.116:3001/V5data?partnum_like=${encodeURIComponent(query)}`, {
        cache: "no-store"
    });
    let V5data = await response.json();
    return V5data;
}