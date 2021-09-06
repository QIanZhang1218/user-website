import { Carousel } from "react-carousel-minimal";

export default function CarouselTest() {
    const data = [
        {
            image: "https://www.lovehappensmag.com/blog/wp-content/uploads/2019/10/Clementinum_library-1.jpg"
        },
        {
            image: "https://www.lovehappensmag.com/blog/wp-content/uploads/2019/10/Stift_Admont_Bibliothek-1140x660.jpg",
        },
        {
            image: "https://www.openathens.net/app/uploads/2021/08/alfons-morales-YLSwjSy7stw-unsplash.jpg",
        },
        {
            image: "https://www.lovehappensmag.com/blog/wp-content/uploads/2019/10/1017px-Long_Room_Interior_Trinity_College_Dublin_Ireland_-_Diliff.jpg",
            // caption: "<div>San Francisco</div>"
        },
        {
            image: "https://www.lovehappensmag.com/blog/wp-content/uploads/2019/10/Taipei_Public_Library_Beitou_Branch_Interior_2015-1024x678.jpg",
        },
        {
            image: "https://www.trafalgar.com/real-word/wp-content/uploads/sites/3/2020/03/Strahov-Library-Prague-1.jpg",
        },
        {
            image: "https://www.lovehappensmag.com/blog/wp-content/uploads/2019/10/リオの幻想図書館_Real_Gabinete_Portugues_de_Leitura_8735773218-1024x679.jpg",
        },
        {
            image: "https://www.lovehappensmag.com/blog/wp-content/uploads/2019/10/1280px-Alexandrina_Library_in_Alexandria_Egypt._03-1-1024x583.jpg",
        }
    ];

    // const captionStyle = {
    //     fontSize: '2em',
    //     fontWeight: 'bold',
    // }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    padding: "0 20px"
                }}>
                    <Carousel
                        data={data}
                        time={3000}
                        width="1000px"
                        height="500px"
                        // captionStyle={captionStyle}
                        radius="10px"
                        slideNumber={true}
                        slideNumberStyle={slideNumberStyle}
                        captionPosition="bottom"
                        automatic={true}
                        dots={true}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        thumbnails={true}
                        thumbnailWidth="100px"
                        style={{
                            textAlign: "center",
                            maxWidth: "900px",
                            margin: "0 auto 30px auto",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
