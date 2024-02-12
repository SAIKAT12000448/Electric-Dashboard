import Banner from "./ui/Banner";
import ElectronicsItem from "./ui/ElectronicsItem";
import Footer from "./ui/Footer";
import Menubar from "./ui/Menubar";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Menubar></Menubar>
            <ElectronicsItem></ElectronicsItem>
            <Footer></Footer>
        </div>
    );
};

export default Home;