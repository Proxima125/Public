import { Projectstype } from "../../../jsonserver/types"

export async function getprojectlist(): Promise<Projectstype[]> {
  let response = await fetch(`http://172.19.179.116:3001/Projects`, {
      cache: "no-store"
  });
  let projects = await response.json();
  return projects.reverse();
}