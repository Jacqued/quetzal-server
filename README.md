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
  
#### Important ! All other routes

Any request to one of the subsequent routes **MUST** contain this header. Without it, you will be returned `401 Unauthorized` to each and every request.

`Authorization` `bearer **token**` : the token that was issued at login.

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

Gel all info on an org

* /orgs/:id
* GET
* Returns
  * **200** : success
  	* Org object with populated fields
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

Delete a given receiver

* /receivers/delete
* POST
* `deleteId` : _id of receiver to delete
* Returns
  * **200** : success
  * **401** : not admin of owner org
  * **404** : no receiver with this _id
  * **500** : error