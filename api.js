// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-A'

// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}players`)
    const result = await response.json()
    console.log(result)
    return result
  } catch (err) {
    console.error('Uh oh, trouble fetching players!', err)
  }
}

const fetchSinglePlayer = async playerId => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`)
    const result = await response.json()
    console.log(result)
    // renderSinglePlayer(result)
    return result
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err)
  }
}

export { fetchAllPlayers, fetchSinglePlayer }
