import FileUploader from '../components/FileUploader';
import View from '../components/View';
import '../styles/Home.css'
function HomePage() {
    return (
        <div>
            <img src='../img/background.jpg'
                alt="background"
                width='100%'
                height='105%'
                className='imgStyle'
            />
            <div className='home'>
                <View />
                <FileUploader />
            </div>
        </div>
    )
}

export default HomePage;