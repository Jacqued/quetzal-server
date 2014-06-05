# Quetzal Server API docs

### User related routes
---

Register a new user

* /register
* POST
* `username` : username
* `password` : password
* Returns :
  * **201** : success
  * **500** : error

Login

* /login
* POST
* `username` : username
* `password` : password
* Returns :
  * **200** : success
      * String : token to use with all further reqs
  * **401** : wrong credentials
  
#### Important ! HEADERS !

Any request to one of the subsequent routes **MUST** contain this header. Without it, you will be returned `401 Unauthorized` to each and every request.

`Authorization` `bearer **token**` : the token that was issued at login  
`Content-Type` `application/json` for all routes that make use of POST/PUT data


### Orgs related routes
---

Create new org

* /orgs
* PUT
* `name` : name of the org to create
* Returns
  * **201** : success
  	* Newly created org object
  * **400** : lacks name argument
  * **401** : unauthorized token
  * **500** : error
  
List all orgs user has access to

* /orgs
* GET
* Returns
  * **200** : success
    * Array of orgs objects
  * **204** : user has no orgs
  * **500** : error

Get all info on an org

* /orgs/:id
* GET
* __Requires member status__
* Returns
  * **200** : success
  	* Org object with populated fields
  * **401** : Unauthorized
  * **404** : no org with this _id
  * **500** : error
  
Get an org's messages

* /orgs/:id/messages
* GET
* Optional argument : `pagination` might be a number that paginates responses by 20. If it is not supplied, assumed to be 1.
* __Requires member status__
* Returns
  * **200** : success
  	* Paginated array of messages
  * **204** : req doesn't match any message
  * **401** : Unauthorized
  * **404** : no org with this _id
  * **500** : error
  
Update a given org

* /orgs/:id
* POST
* `JSON Object with same keys as what API returns. _id cannot be changed this way`
* __Requires admin status__
* Returns
    * **200** : success
      * Updated org object
    * **204** : Missing post data
    * **401** : Unauthorized
    * **404** : no org with this _id
    * **500** : error

Delete a given org

* /orgs/:id
* DELETE
* __Requires admin status__
* Returns
  * **200** : success
  * **401** : Unauthorized
  * **404** : no org with this _id
  * **500** : error

### Receivers related routes
---

Create new receiver

* /receivers
* PUT
* `name` : name of receiver to create
* `parentOrg` : org under which to create it
* Returns
  * **200** : success
  	* Newly created receiver object
  * **400** : no name or parent org doesn't exist
  * **401** : user lacks admin rights on org, or orgs doesn't exist
  * **500** : error

List all receivers user has access to

* /receivers
* GET
* Returns
  * **200** : success
    * Array of receiver objects
  * **500** : error
  
Gel all info on a receiver

* /receivers/:id
* GET
* __Requires member status__
* Returns
  * **200** : success
  	* Receiver object with populated fields
  * **401** : Unauthorized
  * **404** : no receiver with this _id
  * **500** : error
  
Get a receiver's messages

* /receivers/:id/messages
* GET
* Optional argument : `pagination` might be a number that paginates responses by 20. If it is not supplied, assumed to be 1.
* __Requires member status__
* Returns
  * **200** : success
  	* Paginated array of messages
  * **204** : req doesn't match any message
  * **401** : Unauthorized
  * **404** : no receiver with this _id
  * **500** : error

Update a given receiver

* /receivers/:id
* POST
* `JSON Object with same keys as what API returns. _id cannot be changed this way`
* __Requires admin status__
* Returns
    * **200** : success
      * Updated receiver object
    * **204** : Missing post data
    * **401** : Unauthorized
    * **404** : no receiver with this _id
    * **500** : error

Delete a given receiver

* /receivers/:id
* DELETE
* __Requires admin status__
* Returns
  * **200** : success
  * **401** : Unauthorized
  * **404** : no receiver with this _id
  * **500** : error
  
### Messages related routes
---

Create new Message

* /receivers/:id
* _Placed under this URL scheme for expressiveness_
* PUT
* __Requires member status__
* JSON Object with fields
	* `content` : String, text message
	* `fields` : Optional array of objects for special fields, each containing the following :
		* `masterkey` : lowercase string, codename of the field used for templating and scripts. If this is not a lowercase string, write will not succeed.
		* `name` : Human readable name of the field
		* `content` : String, Array, Object. The semantic content of the field that is to be used for special templating and scripts.
* Returns
  * **200** : success
  	* Newly created message object
  * **204** : no content or malformed JSON
  * **400** : `masterkey` is not a lowercase string
  * **401** : Unauthorized
  * **500** : error
  
List all messages a user has access to

* /messages
* GET
* Optional argument : `pagination` might be a number that paginates responses by 20. If it is not supplied, assumed to be 1.
* __Requires member status__
* Returns
  * **200** : success
  	* Paginated array of messages
  * **204** : user can't access any message
  * **401** : Unauthorized
  * **500** : error