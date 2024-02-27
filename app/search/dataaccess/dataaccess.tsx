import { V5datatype } from "../../../jsonserver/types"

export async function getv5datalist(category: string, query: string): Promise<V5datatype[]> {
    let response = await fetch(`http://172.19.179.116:3001/V5data?${encodeURIComponent(category)}_like=${encodeURIComponent(query)}`, {
        cache: "no-store"
    });
    let V5data = await response.json();
    return V5data.reverse();
}