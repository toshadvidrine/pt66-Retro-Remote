export const initialStore = () => {
  return {
    token: null,
    id:null,
    username:'',
    movies: [],
    shows: [],
    movie_details:[],
    movie_cast : [],
    tvShow_details:[],
    tvShow_cast:[],
    reviews:[]
  }
};

function mappingArray(cast_crew){
  const cast_data =  {
    actors:[],
    directors:[],
    writers:[]
  }
      cast_crew?.forEach((obj)=>{
          if(obj['known_for_department'] == 'Acting'){
            if(cast_data['actors'].indexOf(obj['name'])<0 && cast_data['actors'].length <4){
              cast_data['actors'].push(obj['name'])
            }

            } else if(obj['department'] == 'Directing' || obj['known_for_department'] == 'Directing'){
              if(cast_data['directors'].indexOf(obj['name'])<0 && cast_data['directors'].length < 4){
                cast_data['directors'].push(obj['name'])
              }

            }else if(obj['department'] == 'Writing' || obj['known_for_department'] == 'Writing' ){
              if(cast_data['writers'].indexOf(obj['name'])<0. && cast_data['writers'].length < 4){
                cast_data['writers'].push(obj['name'])
              }
            }
        })

  return cast_data;
}

export default function storeReducer(state, action={}) {
  switch (action.type) {
    case 'login':
      return state;
    case 'set_movies':
      return {
        ...state,
        movies: action.payload.results || action.payload // Ensure it handles the correct payload structure
      };
    case 'set_shows':
      return {
        ...state,
        shows: action.payload.results || action.payload // Ensure it handles the correct payload structure
      };
    case 'LOGIN_SUCCESS':

      return {
        ...state,
        token: action.payload.access_token,
        id: action.payload.id,
        username:action.payload.username
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        token: null
      }
      case 'set_movie_details':
      return {
        ...state,
        movie_details: action.payload.results || action.payload
      }
      case 'set_movie_cast':
      const results = action.payload;
      const movie_cast = results['cast'];
      const movie_crew = results['crew'];
      const movie_cast_crew = movie_cast?.concat(movie_crew);
      const movie_cast_data =  mappingArray(movie_cast_crew);

        return {
          ...state,
          movie_cast: movie_cast_data
        }
    case 'set_tvShow_details':
        return {
          ...state,
          tvShow_details: action.payload.results || action.payload
        }
    case 'set_tvShow_cast':
      const tvShow_results = action.payload;
      const tvShow_cast = tvShow_results['cast'];
      const tvShow_crew = tvShow_results['crew'];
      const tvShow_cast_crew = tvShow_cast?.concat(tvShow_crew);
      const tvShow_cast_data =  mappingArray(tvShow_cast_crew);
        return {
          ...state,
          tvShow_cast: tvShow_cast_data
        }
    case 'set_reviews':
      return{
        ...state,
        reviews: action.payload
      }
    default:
      return state;
  }
}
