import { writable } from 'svelte/store'



const store = () => {

    const state = {
        play: false,
        repeat: false,
        currentTrack: {
            name: "Music One",
            image: "",
            path: "https://assets.mixkit.co/music/download/mixkit-home-551.mp3",
            artist: "Music Artist Oone",
        },
        songs: [
            {
                id: 1,
                title: "Music One",
                artist: "Music Artis One",
                path: "https://assets.mixkit.co/music/download/mixkit-home-551.mp3",
                image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 2,
                title: "Music Two",
                artist: "Music Artist Two",
                path: "https://assets.mixkit.co/music/download/mixkit-discover-587.mp3",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 3,
                title: "Music Three",
                artist: "Music Artist Three",
                path: "https://assets.mixkit.co/music/download/mixkit-we-will-get-it-598.mp3",
                image: "https://images.unsplash.com/photo-1499415479124-43c32433a620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
            },
        ]
    }


    const { subscribe, set, update } = writable(state)


    const methods = {

        formatTime(time) {
            let min = Math.floor(time / 60);
            if (min < 10) {
                min = `0${min}`;
            }
            let sec = Math.floor(time % 60);
            if (sec < 10) {
                sec = `0${sec}`;
            }
            return `${min} : ${sec}`;
        }
    }

    return {
        subscribe,
        set,
        update,
        ...methods
    }
}

export default store();