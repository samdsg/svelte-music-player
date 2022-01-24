<script>
    import { onMount } from "svelte";
    import MusicStore from "../store";

    $: allSongs = $MusicStore.songs;

    // Images
    import BackgroundImg from "../assets/musicstd.jpg";
    import CloseBtn from "../assets/close.png";
    import Singer from "../assets/singer.jpeg";
    import PlayListPlay from "../assets/playlist_play.png";

    // Actions
    const closeBtn = () => {
        const playList = document.querySelector("#playlist");
        const checkClass = playList.classList.contains("show_playlist");

        if (checkClass) {
            playList.classList.remove("show_playlist");
        }
    };

</script>

<main id="playlist">
    <div class="playlist_cover">
        <div class="playlist_img_bg">
            <img src={BackgroundImg} alt="Music Background" />

            <div class="p_close" on:click={closeBtn}>
                <img src={CloseBtn} alt="Close" />
            </div>

            <div class="p_release">
                <h3>Playlist</h3>
            </div>
        </div>

        <div class="playlist_songs">
            <h3>Popular</h3>

            <div class="playlist_container">
                {#each allSongs as { title, artist, image }}
                    <div class="playlist_music">
                        <div class="playlist_music_img">
                            <img src={image} alt="Singer Name" />
                        </div>
                        <div class="playlist_music_details">
                            <div class="playlist_music_title">{title}</div>
                            <div class="playlist_music_singer">{artist}</div>

                            <div class="play_box_btn">
                                <img src={PlayListPlay} alt="Play this Muisc" />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>
