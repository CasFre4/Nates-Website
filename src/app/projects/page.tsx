// import { useState } from 'react'

import projects from "../../data/projects.json"
import TreeGen from "../../components/Tree"

function ProjectsPage() {

  return (
    // <></>
      <TreeGen data={projects} path={"/projects/"}/>
    
  )
    // return (
    //   <>
    //     <div style={{paddingTop: '1rem'} as React.CSSProperties}>
    //       {/* <Projects /> */}
    //   </div>
    //   </>
    // )
  }
  
  export default ProjectsPage