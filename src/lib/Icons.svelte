<script>
    export let icons;            
</script>

<h1>{icons.feltIcon}Icons{icons.feltIcon}</h1>
<ul>    
    {#each Object.entries(icons) as icon}
		<li>{icon}</li>	
    {/each}
</ul>
