<script>
    import { get } from "svelte/store";
    import MusicStore from "../store";

    $: allSongs = $MusicStore.songs;

    import { onMount } from "svelte";

    import { useNavigate } from "svelte-navigator";

    // Navigation
    const navigate = useNavigate();

    // Components
    import PlayList from "./PlayList.svelte";

    // Images
    import BackBtn from "../assets/back.png";
    import MenuBtn from "../assets/menu.png";
    import Singer from "../assets/singer.jpeg";
    import RandomBtn from "../assets/random.png";
    import SkipBackBtn from "../assets/go_back.png";
    import PlayBtn from "../assets/play_btn.png";
    import SkipForwardBtn from "../assets/go_forward.png";
    import RepeatBtn from "../assets/repeat.png";

    // Actions
    const toggleMenu = () => {
        const playList = document.querySelector("#playlist");
        const checkClass = playList.classList.contains("show_playlist");

        if (!checkClass) {
            playList.classList.add("show_playlist");
        }
    };

    const backBtn = () => {
        navigate("/");
    };

    let songCount = 0;

    // get first track
    const { title, artist, path, image } = get(MusicStore).songs[0];

    // Current Playsong
    let currentTrackName = title;
    let currentTrackImage = image;
    let currentTrackPath = path;
    let currentTrackArtist = artist;

    // Lifecycle Methods
    onMount(async () => {
        // Actions elements
        const audio = document.querySelector("#audio");
        const randomBtn = document.querySelector(".random");
        const skipback = document.querySelector(".skipback");
        const play_btn = document.querySelector(".play_btn");
        const skipforward = document.querySelector(".skipforward");
        const repeat = document.querySelector(".repeat");
        const player_box = document.querySelector(".player_box");
        const singer_picture = document.querySelector(".singer_picture");
        const player_bar = document.querySelector(".player_bar");

        const setMusic = (trackPath) => {
            audio.src = trackPath;

            if (play_btn.className.includes("pause")) {
                audio.play();
            } else {
                audio.pause();
            }

            play_btn.classList.toggle("pause");
            player_box.classList.toggle("play");
            singer_picture.classList.toggle("play");
        };

        const playMusic = () => {
            audio.play();
            play_btn.classList.remove("pause");
            singer_picture.classList.add("play");
        };

        const skipToNext = () => {
            if (songCount >= allSongs.length - 1) {
                songCount = 0;
                handleSkips(allSongs);
                return;
            }

            while (songCount <= allSongs.length - 1) {
                songCount = songCount + 1;
                break;
            }
            handleSkips(allSongs);
        };

        const skipToBack = () => {
            if (songCount <= 0) {
                songCount = allSongs.length - 1;
                handleSkips(allSongs);
            } else {
                songCount--;
                handleSkips(allSongs);
            }
        };

        const handleSkips = (allSongs) => {
            const {
                title: songName,
                path: songPath,
                artist: songArtist,
                image: songImage,
            } = allSongs[songCount];

            currentTrackName = songName;
            currentTrackArtist = songArtist;
            currentTrackImage = songImage;
            currentTrackPath = songPath;

            setMusic(songPath);
            playMusic();
        };

        // Activate Events
        play_btn.addEventListener("click", (e) => {
            const trackName = e.currentTarget.getAttribute("data-track");
            setMusic(trackName);
        });

        // seek bar
        setInterval(() => {
            player_bar.value = audio.currentTime;
        }, 500);

        // Jump btw songs
        player_bar.addEventListener("change", () => {
            audio.currentTime = player_bar.value;
            curretrTrackTime = audio.currentTime;
        });

        // Skip Buttons
        skipforward.addEventListener("click", skipToNext);
        skipback.addEventListener("click", skipToBack);
    });
</script>

<main>
    <div class="player_wrapper">
        <header id="player_header">
            <div class="back_btn flex-center" on:click={backBtn}>
                <img src={BackBtn} alt="Go Back" />
            </div>
            <div class="app_name flex-center">Svelte Music</div>
            <div class="menu_btn flex-center" on:click={toggleMenu}>
                <img src={MenuBtn} alt="Menu" />
            </div>
        </header>
        <main class="">
            <div class="music_player_wrapper">
                <div class="picture_wrapper flex-center">
                    <div class="singer_picture">
                        <img src={currentTrackImage} alt="Music Singer Name" />
                    </div>
                </div>

                <div class="music_player_singer_info">
                    <h3>
                        {currentTrackName}
                        <span class="singer">{currentTrackArtist}</span>
                    </h3>
                </div>

                <div class="player_box">
                    <div class="progress_bar_box">
                        <input type="range" value="0" class="player_bar" />

                        <!-- <audio id="audio" /> -->
                        <audio id="audio">
                            <source src={currentTrackPath} />
                        </audio>
                    </div>

                    <div class="controls">
                        <div class="btns skipback">
                            <img src={SkipBackBtn} alt="Skip Back" />
                        </div>

                        <button
                            class="play_btn pause"
                            data-track={currentTrackPath}
                        >
                            <span />
                            <span />
                        </button>

                        <div class="btns skipforward">
                            <img src={SkipForwardBtn} alt="Skip Foward" />
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <PlayList />
    </div>
</main>

<style>
    .player_wrapper {
        overflow: hidden;
        margin: 20px auto;
        width: 40%;
        padding: 30px 40px;
        border-radius: 4px;
        user-select: none;
    }

    .back_btn,
    .menu_btn {
        width: 32px;
        height: 32px;
        padding: 2px;
        cursor: pointer;
    }

    .back_btn {
        grid-area: back_btn;
    }

    .app_name {
        grid-area: app_name;
        color: #fff;
        font-weight: 900;
        font-size: 1.3em;
        text-transform: uppercase;
    }

    .menu_btn {
        grid-area: menu_btn;
    }

    #player_header {
        display: grid;
        grid-template-areas: "back_btn app_name menu_btn";
        grid-template-columns: 10% 80% 10%;
        margin-bottom: 30px;
    }
</style>
