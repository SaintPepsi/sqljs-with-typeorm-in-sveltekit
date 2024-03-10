<script lang="ts">
	import { databaseReady } from '$lib/data/databaseReady';
	import { SqlJsDataSource } from '$lib/dataSource';
	import { Period } from '$lib/typeorm/entities/Period';
	import { Visit } from '$lib/typeorm/entities/Visit';

	let visitAmount = 0;
	let visitPeriod: number;
	let possiblePeriods: Promise<Period[]> = new Promise((resolve) => {
		resolve([]);
	});

	let visits: Visit[] = [];

	async function getUpdatedVisits() {
		visits = await SqlJsDataSource.manager.find(Visit, {
			relations: {
				period: true
			}
		});
	}

	$: {
		if ($databaseReady) {
			getUpdatedVisits();

			possiblePeriods = SqlJsDataSource.manager.find(Period).then((periods) => {
				visitPeriod = periods[0].id;
				return periods;
			});
		}
	}

	async function addVisit() {
		const periods = await possiblePeriods;
		const newVisit = new Visit();
		console.log('visitPeriod', visitPeriod);
		const foundPeriod = periods.find((period) => period.id === visitPeriod);
		if (!foundPeriod) {
			throw new Error('Period not found');
		}

		newVisit.period = foundPeriod;
		newVisit.amount = visitAmount;
		await SqlJsDataSource.manager.save(newVisit);

		getUpdatedVisits();
	}
</script>

<button
	type="button"
	on:click={() => {
		SqlJsDataSource.dropDatabase();
	}}
>
	Drop Database
</button>

<h1>Add Visit</h1>

<div>
	<label for="visits">Visits</label>
	<input id="visits" type="number" bind:value={visitAmount} />
</div>
<div>
	<label for="visits">Period</label>
	<select bind:value={visitPeriod}>
		{#await possiblePeriods}
			<!-- possiblePeriods is pending -->
			Loading Periods
		{:then periods}
			<!-- possiblePeriods was fulfilled -->
			{#each periods as period}
				<option value={period.id}>
					{period.period}
				</option>
			{/each}
		{:catch error}
			<!-- possiblePeriods was rejected -->
			Something went wrong fetching the periods: {error.message}
		{/await}
	</select>
</div>

<button type="button" on:click={addVisit} disabled={!$databaseReady}> Add Visit </button>

<hr />

<h2>All Visits:</h2>

{#await visits}
	<!-- visits is pending -->
	Loading Visits
{:then visits}
	<!-- visits was fulfilled -->
	{#each visits as visit}
		<p>{visit.amount} visits in {visit.period.period}</p>
	{/each}
{:catch error}
	<!-- visits was rejected -->
	Something went wrong fetching the visits: {error.message}
{/await}
