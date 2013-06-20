window.Ember.TEMPLATES["multiview_new"] = Ember.Handlebars.compile("<div id=\"create-view-container\">\n  <section class=\"step clearfix\">\n    <h2>Create your view</h2>\n    <div class=\"sub-step\">\n      <h3>(1) Select up to 3 dimensions</h3>\n      \n      <div class=\"inner clearfix\">\n        <div class=\"options\">\n          <div class=\"option\">Age</div>\n          <div class=\"option\">Gender</div>\n          <div class=\"option\">Income</div>\n        </div>\n        <div class=\"right-arrow\"></div>\n        <div class=\"selected-options options\">\n          <div class=\"option\">Income</div>\n          <div class=\"option\">Region</div>\n        </div>\n      </div>\n    </div>\n    \n    <div class=\"sub-step\">\n      <h3>(2) Choose the measure you want to see</h3>\n      \n      <form class=\"inner\">\n        <div class=\"clearfix\">\n          <div class=\"radio-input clearfix\">\n            <input type=\"radio\" name=\"measure\" value=\"revenue\">\n            <span>Revenue</span>\n          </div>\n          <div class=\"radio-input\">\n            <input type=\"radio\" name=\"measure\" value=\"cost\">\n            <span>Cost</span>\n          </div>\n          <div class=\"radio-input\">\n            <input type=\"radio\" name=\"measure\" value=\"forecast\">\n            <span>Forecast</span>\n          </div>\n        </div>\n      </form>\n    </div>\n  </section>\n</div>\n");