import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BD from '../BookDetails/BookDetails.module.css'
import Grid from "@material-ui/core/Grid";
import { MdLocalLibrary } from "react-icons/md";
import Button from '@material-ui/core/Button';
import Modal from "../Modal/Modal";
import ReserveForm from "../ReserveForm/ReserveForm"
import MD from "../Modal/Modal.module.css";
let bookId;
export default function BookDetails(props) {

    let bookContent;
    //creat react context
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [content,setContent] =useState();
    const [currentAmount, setCurrentAmount] = useState();
    //modal start
    const [modalVisible, setModalVisible] = useState(false);
    const modalConfig = {
        visible: modalVisible,
        closeModal: () => {
            setModalVisible(false);
        }
    };

    const modalChildren = (
        <div className={MD.dialog}>
            <span onClick={() => setModalVisible(false)} className={MD.closeBtn}>x</span>
            <div>
                <ReserveForm/>
            </div>
        </div>
    );
    //modal end
    bookId = props.location.search.slice(4);
    useEffect(() => {
        axios.get("/api/BookList/GetBooksDetail",{
                    params:{
                        bookId: bookId
                    }
                }).then(response => {
            setData(response.data);
            setLoading(false);
            bookContent = response.data[0].bookContent;
            if (bookContent!==""){
                setContent(<p className={BD.sectionInfo}><span className={BD.title}>Contents:</span><span className={BD.item}>{bookContent}</span></p>);
            }
            if (response.data[0].bookCurrentAmount > 0){
                setCurrentAmount( <Button onClick={() => setModalVisible(true)} variant="contained" color="primary">Place Hole</Button>)
            }else{
                setCurrentAmount( <Button variant="contained" color="disable">Not Available</Button>)
            }
        });
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // function PlaceHold(event){
    //
    //     event.preventDefault();
    //     var para = {
    //         bookId
    //     }
    //     console.log(typeof(para));
    //     axios({
    //         url: '/api/BookList/ReserveBooks',
    //         method: 'post',
    //         headers: {
    //             'deviceCode': 'A95ZEF1-47B5-AC90BF3'
    //         },
    //         contentType:'application/json'
    //         ,
    //         data: {
    //             bookId: para.bookId,
    //         }})
    // }

    return(
        <React.Fragment>
        <div className={BD.mainContent}>
            {data.map(item =>
                <Grid container spacing={3} id={item.bookId}>
                    {/*left side book img*/}
                    <Grid item xs={2}>
                        <img className={BD.img} src={item.bookImg}  alt={'Image failed to load'}/>
                    </Grid>
                    {/*right side book info*/}
                    <Grid item xs ={8}>
                        <section className={BD.bookInfo}>
                            {/*book name*/}
                            <h2>{item.bookName}</h2>
                            {/*book author*/}
                            <div className={BD.availableBox}>
                                <MdLocalLibrary color="disabled"/>
                                <span className={BD.availableFont}>Avaliable At:</span>
                                <span className={BD.location}> {item.bookLocation}</span>
                            </div>

                        </section>
                        <section className={BD.bookInfo}>
                            <p className={BD.sectionInfo}><span className={BD.title}>Author:</span><span className={BD.item}>{item.bookAuthor}</span></p>
                            <p className={BD.sectionInfo}><span className={BD.title}>Publication Information:</span><span className={BD.item}>{item.bookPublishInfo}</span></p>
                            <p className={BD.sectionInfo}><span className={BD.title}>Physical Description:</span><span className={BD.item}>{item.bookPages} pages</span></p>
                            {content}
                            <p className={BD.sectionInfo}><span className={BD.title}>Category:</span><span className={BD.item}>{item.bookClass}</span></p>
                            <p className={BD.sectionInfo}><span className={BD.title}>Language:</span><span className={BD.item}>{item.bookLanguage}</span></p>
                            <p className={BD.sectionInfo}><span className={BD.title}>Current Available:</span><span className={BD.item}>{item.bookCurrentAmount}</span></p>
                            <p className={BD.sectionInfo}><span className={BD.title}>Abstract:</span><span className={BD.item}>{item.bookAbstract}</span></p>
                        </section>
                    </Grid>
                    <Grid item xs ={2}>
                        <div className={BD.holdButton}>
                            {currentAmount}
                        </div>

                    </Grid>
                </Grid>
            )
            }
        </div>
            <Modal {...modalConfig}>{modalChildren}</Modal>
        </React.Fragment>
    )
}

    // constructor(props,context) {
    //     super(props,context);
    //     console.info(props);
    //     this.bookId = parseInt(Object.values(
    //             qs.parse(this.props.location.search.slice(1))
    //     ));
    //     this.state = {
    //         posts: []
    //     };
    // }

    // componentDidMount(){
    //     axios.get("/api/BookList/GetBooksDetail",{
    //         params:{
    //             bookId: this.bookId
    //         }
    //     })
    //         .then(res => {
    //             const posts = res.data[0].map(obj => obj.data);
    //             this.setState({posts});
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
    // render(){
    //     return (
    //         {data.map(post =>
    //                     <div className={BD.mainContent}>
    //                         <div className={BD.bookImg}>
    //                             <img className={HomepageMain.bookImg} src={posts.bookImg}></img>
    //                         </div>
    //                     </div>
    //                 )}
    //     )
    // }


