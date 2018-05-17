package com.elte.reserved.service;

import com.elte.reserved.domain.Comment;
import com.elte.reserved.domain.Restaurant;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class PlacesService {

    private static final String PLACES_API_BASE = "https://maps.googleapis.com/maps/api/place";

    private static final Logger log = LoggerFactory.getLogger(PlacesService.class);

    private static final String TYPE_AUTOCOMPLETE = "/autocomplete";
    private static final String TYPE_DETAILS = "/details";
    private static final String TYPE_SEARCH = "/search";

    private static final String OUT_JSON = "/json";

    // KEY!
    private static final String API_KEY = "GOOGLE_MAPS_API_KEY";

    public static Restaurant details(Restaurant restaurant) {
        HttpURLConnection conn = null;
        StringBuilder jsonResults = new StringBuilder();
        try {
            StringBuilder sb = new StringBuilder(PLACES_API_BASE);
            sb.append(TYPE_DETAILS);
            sb.append(OUT_JSON);
            sb.append("?sensor=false");
            sb.append("&key=" + API_KEY);
            sb.append("&place_id=" + restaurant.getGooglePlaceId());

            URL url = new URL(sb.toString());
            conn = (HttpURLConnection) url.openConnection();
            InputStreamReader in = new InputStreamReader(conn.getInputStream());

            // Load the results into a StringBuilder
            int read;
            char[] buff = new char[1024];
            while ((read = in.read(buff)) != -1) {
                jsonResults.append(buff, 0, read);
            }
        } catch (MalformedURLException e) {
            log.debug("Error processing Places API URL", e);
            return null;
        } catch (IOException e) {
            log.debug("Error connecting to Places API", e);
            return null;
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }

        try {
            // Create a JSON object hierarchy from the results
            JSONObject jsonObj = new JSONObject(jsonResults.toString()).getJSONObject("result");

            restaurant.setRating((int) (jsonObj.getDouble("rating") * 10));

            Set<Comment> commentSet = new LinkedHashSet<>();
            JSONArray jsonArray = jsonObj.getJSONArray("reviews");
            for (int i = 0; i < jsonArray.length(); i++) {
                Comment comment = new Comment();
                comment.setAuthorName(jsonArray.getJSONObject(i).getString("author_name"));
                comment.setText(jsonArray.getJSONObject(i).getString("text"));
                comment.setRestaurant(restaurant);
                commentSet.add(comment);
            }

            restaurant.setComments(commentSet);
        } catch (JSONException e) {
            log.debug("Error processing JSON results", e);
        }


        return restaurant;
    }
}
