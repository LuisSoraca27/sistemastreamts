import  { useEffect, useState } from 'react';
import IsLoading from '../Components/IsLoading';
import { useDispatch, useSelector } from 'react-redux';
import CardProfile from '../Components/CardProfile';
import netflix from '../assets/img/netflix.png';
import amazon_prime from '../assets/img/amazon_prime.png';
import hbo from '../assets/img/hbo.png';
import crunchyroll from '../assets/img/crunchyroll.webp';
import paramount_plus from '../assets/img/paramount-plus.png';
import plex from '../assets/img/plex.png';
import vix from '../assets/img/vix.png';
import spotify from '../assets/img/spotify.webp';
import { setAccountThunk } from '../features/account/accountSlice';
import { setIsLoading } from '../features/isLoading/isLoadingSlice';
import ModalAccount from './ModalAccount';
import { setBalanceThunk } from '../features/balance/balanceSlice';
import canva from '../assets/img/canva.png';
import iptv from '../assets/img/iptv.webp';
import telelatino from '../assets/img/telelatino.png';
import magistv from '../assets/img/magistv.png';
import jellyfin from '../assets/img/jellyfin.png';
import ViewNotificationImg from '../Components/Notifications/ViewNotificationImg';

const Account = () => {

    const categoryImageMap = {
        'netflix': [netflix, 'Netflix'],
        'amazon_prime': [amazon_prime, 'Amazon Prime Video'],
        'hbo_max': [hbo, ' MAX'],
        'crunchyroll': [crunchyroll, 'Crunchyroll'],
        'paramount_plus': [paramount_plus, 'Paramount+'],
        'vix': [vix, 'Vix+'],
        'plex': [plex, 'Next Movie'],
        'iptv': [iptv, 'IPTV'],
        'spotify': [spotify, 'Spotify'],
        'canva': [canva, 'Canva'],
        'tele_latino': [telelatino, 'Telelatino'],
        'magistv': [magistv, 'Magis TV'],
        'jellyfin': [jellyfin, 'Jellyfin'],
    };

    const user = JSON.parse(localStorage.getItem('user'));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [reload, setReload] = useState(false);
    const [isCommunityPanelOpen, setIsCommunityPanelOpen] = useState(true);


    const filterAccounts = () => {
        const accounts0 = accounts.filter(account => account.total === '0');
        const accountsComplete = accounts.filter(account => account.total !== '0');
        return [...accountsComplete, ...accounts0];
    }

    const handleCardClick = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const dispatch = useDispatch();
    let accounts = useSelector((state) => state.accounts.length);
    const isLoadingState = useSelector(state => state.isLoading);

    useEffect(() => {
        dispatch(setBalanceThunk(user?.id));
        dispatch(setIsLoading(true)); // Establecer isLoading en true antes de realizar la solicitud
        dispatch(setAccountThunk())
            .finally(() => {
                dispatch(setIsLoading(false)); // Establecer isLoading en false cuando se complete la solicitud
            });
    }, [dispatch, reload]);

    return (
        <>
            <ViewNotificationImg/>
            {isLoadingState ? <IsLoading /> :
            <div>
 <div className="container-title">
              <h1>Cuentas </h1>
              <p>Encuentra aqui cuentas de tu plataforma favorita</p>
            </div>
                <div className="container-profile">
                    {
                        filterAccounts().map((account, index) => {
                            const img = categoryImageMap[account?.categoryName]?.[0];
                            const title = categoryImageMap[account?.categoryName]?.[1];
                            switch (account?.categoryName) {
                                case "regalo":
                                case "disney_plus":
                                case "Dbasico":
                                case "Destandar":
                                case "Dpremium":
                                case "star_plus":
                                case "wasender":
                                    return null;
                                default:
                                    return (
                                        <div key={index}>
                                            <CardProfile
        
                                                total={account.total}
                                                background={account.categoryName}
                                                img={img}
                                                title={title}
                                                onClick={() => handleCardClick(
                                                    {
                                                        total: account.total,
                                                        categoryName: account.categoryName,
                                                        background: account.categoryName,
                                                        img: img,
                                                        title: title,
                                                        open: isModalOpen,
                                                    }
                                                )}
                                            />
                                        </div>
                                    );
                        }
                        })
                    }
                </div>
               {/* { isCommunityPanelOpen && <CommunitiesPanel onClose={() => setIsCommunityPanelOpen(false)}/> } */}
            </div>
                }
            {isModalOpen && <ModalAccount
                data={modalData}
                onClose={() => setIsModalOpen(false)}
                reCharge={() => setReload(!reload)}
            />}
        </>
    );
};

export default Account;