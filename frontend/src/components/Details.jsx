/* eslint-disable react/prop-types */
import { CiCircleRemove } from "react-icons/ci";

export function Details ({infoBooks,activeBook}){
    
    return (
        <article className="cont_details-padre" >
            <section className="cont_details-child">
                
                <div className="cont_img-details">
                    <img src={infoBooks.cover} alt=""/>
                </div>
                <div className="cont_info-details">
                    <div className="icon_detail" onClick={()=>activeBook(false)}>
                        <CiCircleRemove />
                    </div>
                    <h1 style={{color: '#fff'}}>{infoBooks.title}</h1>
                    <b className="b_details">{infoBooks.author.name}</b> 

                    <br />
                    <p className="p-details">{infoBooks.synopsis}</p>
                    <br />
                    <p>
                    Libros del autor :<br />
                    {infoBooks.author.otherBooks.map((elements,j)=>{
                        return<> <b className="b_details" style={{color : '#1fa'}} key={j}>{elements} </b> <br /></>
                    })}
                    </p>
                    <br />
                    <b className="b_details" style={{color: '#fff'}}>Año {infoBooks.year}</b>
                    <b className="b_details" style={{color: '#fff'}}>Páginas {infoBooks.pages}</b>
                    <br />
                    
                    
                </div>  
            </section>
        </article>
        
    )
}  