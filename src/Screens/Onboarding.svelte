<script>
    import { useNavigate, useLocation } from "svelte-navigator";

    // Images
    import NextIcon from "../assets/forward.png";
    import MusicBg from "../assets/music.jpg";

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();

    // Actions
    const onClick = () => {
        navigate("/player");
    };

</script>

<main id="home">
    <div id="wrapper">
        <img src={MusicBg} alt="music bg" />

        <div class="music_bg_container flex-center">
            <p class="welcome_box">
                Exclusive Access<span>To New Music </span>
            </p>

            <div class="forward_icon" on:click={onClick}>
                <img src={NextIcon} alt="" />
            </div>
        </div>
    </div>
</main>

<style>
    .welcome_box {
        padding: 10px 0 0 0;
        font-size: 2.8em;
        font-weight: 900;
        color: #fff;
        text-align: center;
        user-select: none;
    }

  

    .welcome_box span {
        display: block;
        font-size: 15px;
        margin-top: 10px;
    }
</style>
