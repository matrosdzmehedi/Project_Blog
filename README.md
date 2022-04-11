
# Project_Blog Programming Assessment

<pre> Simple blogging webapp with user authentication(jwt) and user interaction.</pre>

# Install Dependencies:

<p>Here I have used <b>pipenv</b> as virtualenv  </p>

<p> If you have pipenv install then just run :<code> pipenv install </code>  to install all packages.  </p>

<p> If you dont have pipenv and use other virtualenv . Then you can install it by <code> : pip install -r requirements.txt </code> </p>

<p>  goto/change your directory to  <code> /frontend/myapp </code>  to install npm packages </p>
  <P>run :<code> npm install </code></p> 



# change database config : settings.py

<pre> use postgresql </pre>
<code><pre>
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'your db name',
        'USER': 'db username',
        'PASSWORD': 'your pass',
        'HOST': 'localhost',
        'PORT': 5432,
}
</pre></code>
