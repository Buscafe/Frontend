import { useWindowDimensions } from "../../../hooks/useWindowDimensions"

import { Sidebar } from './Sidebars/Desktop'
import { SidebarMobile } from './Sidebars/Mobile'

export function RenderSidebar({ clicked , setClicked, isAdmin = false }){
  const { width } = useWindowDimensions();
  
  return width >= 650 ?(
    <Sidebar clicked={clicked} setClicked={setClicked} isAdmin={isAdmin}/>
  ): (
    <SidebarMobile clicked={clicked} setClicked={setClicked} isAdmin={isAdmin}/>
  )
}