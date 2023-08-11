# TECH STORE APP

## DATABASE
 * [Airtable headless cms](https://airtable.com) was used as a database in this project. A table was created in the cms, and data was fed manually.
   The snapshot of data inside the table looks like this:
 
   ![image](https://github.com/skininja673/tech-store/assets/42822475/20b58acb-5973-4c49-bd29-e5e143a59e50)

 * In order to hide Airtable Api-Key, serverless function was used for fetching both products list and single product from Airtable.
 * The package [airtable-node](https://www.npmjs.com/package/airtable-node) which is a wrapper for main library was installed in the project. The docs were followed 
   closely to implement the serverless function `./functions/products.js` & `./functions/single-product.js`
   
## STATE MANAGEMENT
  *  useReducer with useContext hook was used for state management and delivering data from cms to different components and pages.
  *  `products_context.js` with `products_reducer.js` handles the product related functionalities. e.g. fetching multiple products, fetching single product, handling 
     potential errors.
  * `filter_context.js` with `filter_reducer.js` handles the filter and sorting related functionalities in products page.
  * `cart_context.js` with `cart_reducer.js` handles the functionality of adding the desired product(s) in cart, arithmetic addition of total prices with shipping 
     fee. It also initiate & update the local storage of browser so that on refreshing the browser the added data in cart does not diappear or reset.
  * `user_context.js` handles the login/logout functionality, by connecting Auth0.

## FORM HANDLING
  * Form-Spree was used as a service to collect values from the form.
    

    
    
    
     

