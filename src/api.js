import axios from "axios";
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

api.interceptors.request.use(config => {
    config.params = config.params || {};
    config.params['api_key'] = "4484fda9063dbba85a1726755c5d6321";
    config.params["language"] = "ko";
    return config;
  })


export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    topRated: () => api.get("movie/top_rated"),
    latest: () => api.get("movie/latest"),
    movieDetail: id => 
        api.get(`movie/${id}`, {
            params: {
                append_to_response: "videos"
            }
    }),
    search: term => 
        api.get("search/movie", {
            params: {
                query: encodeURIComponent(term)
            }
        }),
    credits: id => 
        api.get(`movie/${id}/credits`)
};

export const tvApi = {
    topRated: () => api.get("/tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: id => 
        api.get(`tv/${id}`, {
            params: {
                append_to_response: "videos"
            }
        }),
    search: term => 
        api.get("search/tv", {
            params: {
                query: encodeURIComponent(term)
            }
        }),
    credits: id => 
        api.get(`tv/${id}/credits`),
    externalId: id =>
        api.get(`tv/${id}/external_ids`)
};