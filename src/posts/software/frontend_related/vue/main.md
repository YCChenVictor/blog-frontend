### life cycle

* Creation
  * beforeCreate: This hook is called before the component is created. At this point, data observation, event initialization, and injections are yet to be set up.
  * created: The created hook is called once the component has been created. Data observation, computed properties, methods, and watch/event callbacks have been set up. However, the DOM has not been mounted yet.
* Mounting
  * beforeMount: This hook is called before the component's template is compiled, and the resulting DOM is about to be mounted/rendered.
  * mounted: After the template is compiled, the component's DOM is mounted into the page. The mounted hook is called at this point. You can access the mounted DOM element using this.$el.
* Updating
  * beforeUpdate: Whenever a reactive data property changes, the beforeUpdate hook is called just before the DOM is patched to reflect the change.
  * updated: The updated hook is called after the component's reactive data has been updated, and the DOM has been re-rendered to reflect those changes. It is called after every re-render, but be careful not to cause an infinite loop by modifying data within this hook.
* Destruction
  * beforeDestroy: This hook is called just before the component is about to be destroyed. The component is still fully functional at this point.
  * destroyed: The destroyed hook is called after the component is destroyed. At this stage, all event listeners and child components have been removed.
* Error Handling
  * errorCaptured: This hook is available for handling errors that occur during the component's lifecycle. It captures errors from the component and its children.
* Deactivated (For Keep-Alive)
  * deactivated: If a component is wrapped with a <keep-alive> element, the deactivated hook is called when the component becomes deactivated (e.g., when navigated away from).
* Activated (For Keep-Alive)
  * activated: When a component that was deactivated (e.g., navigated away from) is reactivated (e.g., navigated back to), the activated hook is called.

### axios

```javascript
// Import Axios at the top of your Vue component
import axios from 'axios';

export default {
  data() {
    return {
      responseData: null, // To store the response data
    };
  },
  created() {
    // Call the function to make the GET request when the component is created
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://api.example.com/data'); // Replace with your API endpoint
        this.responseData = response.data; // Store the response data in a component data property
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
};
```

### async await

```javascript
export default {
  async created() {
    try {
      await this.method1(); // Wait for method1 to complete before calling method2
      await this.method2(); // Wait for method2 to complete before moving on
    } catch (error) {
      console.error('Error:', error);
    }
  },
  methods: {
    async method1() {
      // Asynchronous logic for method1
      await someAsyncTask();
      console.log('Method 1 executed');
    },
    async method2() {
      // Asynchronous logic for method2
      await someAsyncTask();
      console.log('Method 2 executed');
    },
  },
};
```

### nextTick

```javascript
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Initial message"
    };
  },
  methods: {
    changeMessage() {
      this.message = "Updated message";
      this.$nextTick(() => {
        // This code will be executed after the DOM is updated
        console.log("DOM has been updated with the new message.");
      });
    }
  }
};
</script>
```
