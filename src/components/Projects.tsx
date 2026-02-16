// "use client"
import React from 'react'
// import styles from'../css/Projects.module.css'
// import ProjectList from '../assets/ProjectList'
import ReactMarkdown from 'react-markdown'
import {Pages, Item} from '../types/jsontypes'



export function generateParams(data: Pages, prefix?: string) {
    const params: { slug: string }[] = [];
    Object.values(data).forEach((items) => {
        items.forEach((item) => {
            if (item.link && item.title && !item.link.startsWith("/")) {
                const slug = prefix ? `${prefix}/${item.link}` : item.link;
                params.push({ slug });
            }
        });
    });
    return params;
}
export default function DynamicPage({ 
  data, 
  slug 
}: { 
  data: Pages; 
  slug: string;
}) {
    let foundItem: Item|null = null;
    Object.entries(data).forEach(([key, items], index) => {
        const item = items.find((d) => d.link === slug && d.title !== undefined);
        if (item) {
            foundItem = item;
        }
    })
    //   data.find((d) => d.link === slug && d.title!=null);

    if (!foundItem) return <div>Not found</div>;
    const item = foundItem as Item;

    return (
    <div>
        <h1>{item.title}</h1>
        <p>{item.date}</p>
        <div><ReactMarkdown>{item.content}</ReactMarkdown></div>
    </div>
    );
}
// const Projects: React.FC = () => {
//     // const [projectList, setProjectList] = useState(projectListRaw)
    
//     const projectList = ProjectList()
//     // const [projectList, setProjectList] = useState([]);
//     // 
//     // useEffect(() => {
//     //     async function fetchData() {
//     //     const data = await ProjectList(); // assumes ProjectList returns a Promise
//     //     setProjectList(data);
//     //     }

//     //     fetchData();
//     // }, []);
//     // console.log(`End project List ${projectList}`)
//     return (
//         <>
//             {projectList.map((project, key: number) => (
//                 <a href={project.link} key={key} className={styles.defaultLink} target="_blank" rel="noopener noreferrer">
//                     <div className={styles.project}>
//                         <div className='col'>
//                             <div className='row'>
//                                 <div className='row' style={{'--text-align-row': 'center'} as React.CSSProperties}>
//                                         <h1>{project.title}</h1>
//                                 </div>
//                                 <div className='row'>
//                                     <div className='col' style={{'--col-width': '.33', '--justify-col': 'flex-start'} as React.CSSProperties}>
//                                         <img src={project.image} />
//                                     </div>
//                                     <div className='col' style={{paddingLeft: '20px', '--justify-col': 'flex-start', '--align-col': 'left'} as React.CSSProperties}>
//                                         <p className={styles.summary}>{project.summary}</p>
//                                         <div className={styles.features}><ReactMarkdown>{project.features}</ReactMarkdown></div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='fixed-row'>
//                                 <div className={styles.skills}>
//                                     {project.skills.map((skill, index) => (
//                                         <p key={`${key}&${index}`}>{skill}</p>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </a>
//             ))}
//         </>
//     )
// }
// export default Projects