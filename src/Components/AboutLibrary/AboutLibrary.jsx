import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import "bootstrap/dist/css/bootstrap.min.css";
import AboutLibraryStyle from './AboutLobrary.module.css';
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
export default function AboutLibrary(){
     return(
         <div className={AboutLibraryStyle.container}>
             <section className={AboutLibraryStyle.introSection}>
                 <h2>About the Library</h2>
                 <p >Welcome to the XXX library</p>
             </section>
             <section className={AboutLibraryStyle.introSection}>
                 <h2>Open Hours</h2>
                 <p className={AboutLibraryStyle.openHours}>Monday - Friday: 8am - 8pm</p>
                 <p className={AboutLibraryStyle.openHours}>Saturday & Sunday: 11am - 6pm</p>
                 <a className={AboutLibraryStyle.sectionLink} href="#">Holidays and Exceptions<BsArrowRight/></a>
             </section>
             <section className={AboutLibraryStyle.introSection}>
                 <h2>Customer Behaviour Guidelines</h2>
                 <p >XXX Libraries are for everyone to enjoy, and we aim to provide a safe and comfortable environment for customers and staff.</p>
                 <p>We ask our customers to show respect for other people and their right to have a positive experience by:</p>
                 <ul className={AboutLibraryStyle.guidelinesUl}>
                     <li>Speaking and behaving appropriately, without swearing, shouting, or offending other customers.</li>
                     <li>Co-operating with our staff and respecting any requests they make.</li>
                     <li>Being drug and alcohol-free.</li>
                     <li>Being considerate of other people’s property, including library furniture and equipment.</li>
                 </ul>
                 <p>Customers may be asked to leave the library if their actions fall outside these guidelines, or cause concern for either other library users or our staff.</p>
                 <a className={AboutLibraryStyle.sectionLink} href="#">More details<BsArrowRight/></a>
             </section>
             <section className={AboutLibraryStyle.introSection}>
                 <h2>Membership</h2>

                 <a className={AboutLibraryStyle.sectionLink} href="#">Holidays and Exceptions<BsArrowRight/></a>
             </section>
             {/*<Container>*/}
             {/*    <Row>*/}
             {/*        <Col xs={6} md={4}>*/}
             {/*            <div className={AboutLibraryStyle.infoBox}>*/}
             {/*                <img src={"https://lh3.googleusercontent.com/proxy/KkF0fUi6zk2WrJeJRhO4RM_45HxcYqhYC4VIdFXBUv351sqq2WBVYWfwujemUK3bVM-Nyj9e8YnWyOGDW97kLQq5VksW2XG5AHdE4Mbu600Ajrj_KA9WV73UneIhNOFX2mIymA"} />*/}
             {/*            </div>*/}
             {/*        </Col>*/}
             {/*        <Col xs={6} md={4}>*/}
             {/*            xs=6 md=4*/}
             {/*        </Col>*/}
             {/*        <Col xs={6} md={4}>*/}
             {/*            xs=6 md=4*/}
             {/*        </Col>*/}
             {/*    </Row>*/}
             {/*</Container>*/}
         </div>
     )
 }