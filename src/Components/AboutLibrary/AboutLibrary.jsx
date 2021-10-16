import React, {useState} from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { BsEnvelopeFill } from 'react-icons/bs';
import { BsGeoAlt } from 'react-icons/bs';
import { AiFillPhone } from 'react-icons/ai';
import "bootstrap/dist/css/bootstrap.min.css";
import AboutLibraryStyle from './AboutLobrary.module.css';
import { Button } from "react-bootstrap";
import axios from "axios";
export default function AboutLibrary(){
    const [name,setName] = useState('');
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');
    function handleSubmit(e){
        e.preventDefault();
        var para = {
            name,email,message
        }
        console.log(para);
        axios({
            url: '/api/BookList/SaveUserMessage',
            method: 'post',
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            contentType:'application/json'
            ,
            data: {
                readerName:para.name,
                readerEmail:para.email,
                readerMessage:para.message
             }}).then(response =>{
            alert(response.data.message);
            window.location.href="/AboutLibrary";
        })
    }
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
                 <p>Joining in Person</p>
                 <p>Joining Online</p>
                 <a className={AboutLibraryStyle.sectionLink} href="#">Holidays and Exceptions<BsArrowRight/></a>
             </section>
             <section className={AboutLibraryStyle.introSection}>
                 <h2>Contact us</h2>
                 <p>By email, phone or in person</p>
                 <ul className={AboutLibraryStyle.contactUl}>
                     <li className={AboutLibraryStyle.contactLi}>
                         <div className={AboutLibraryStyle.contactBox}>
                             <BsEnvelopeFill />
                         </div>
                         <div className={AboutLibraryStyle.contactBox}>
                             <p>library@email.com</p>
                         </div>
                     </li>
                     <li className={AboutLibraryStyle.contactLi}>
                         <div className={AboutLibraryStyle.contactBox}>
                             <AiFillPhone />
                         </div>
                         <div className={AboutLibraryStyle.contactBox}>
                             <p>0221234567</p>
                         </div>
                     </li>
                     <li className={AboutLibraryStyle.contactLi}>
                         <div className={AboutLibraryStyle.contactBox}>
                             <BsGeoAlt />
                         </div>
                         <div className={AboutLibraryStyle.contactBox}>
                             <p>Library address</p>
                         </div>
                     </li>
                 </ul>
                 <h5>Send us a message</h5>
                 <Form style={{textAlign:'left'}} onSubmit={handleSubmit}>
                     <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                         <Form.Label column sm="2">
                             Name
                         </Form.Label>
                         <Col sm="5">
                             <Form.Control type="text"
                                  onInput={ e=>setName(e.target.value)}
                             />
                         </Col>
                     </Form.Group>
                     <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                         <Form.Label column sm="2">
                             Email
                         </Form.Label>
                         <Col sm="5">
                             <Form.Control type="text"
                                  onInput={ e=>setEmail(e.target.value)}
                             />
                         </Col>
                     </Form.Group>
                     <Form.Group as={Row} className="mb-3" controlId="formPlaintextMessage">
                         <Form.Label column sm="2">
                             Message
                         </Form.Label>
                         <Col sm="5">
                             <Form.Control type="text"
                                  as="textarea"
                                  style={{ height: '100px' }}
                                  onInput={ e=>setMessage(e.target.value)}
                             />
                         </Col>
                     </Form.Group>
                     <Button variant="primary" type="submit" style={{marginLeft:'17%'}}>
                         Submit
                     </Button>
                 </Form>
             </section>
         </div>
     )
 }