<script>
	import { Router, Route } from "svelte-navigator";

	// Compoents
	import Onboarding from "./Screens/Onboarding.svelte";
	import Player from "./Screens/Player.svelte";
</script>

<main>
	<Router>
		<Route path="/">
			<Onboarding />
		</Route>

		<Route path="/player">
			<Player />
		</Route>
	</Router>
</main>
 