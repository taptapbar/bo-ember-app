window.Ember.TEMPLATES["filter"] = Ember.Handlebars.compile("<div class=\"popup-window-bg\">\n  <div id=\"filter-window\" class=\"popup-window\">\n    \n    <div class=\"popup-window-header\">Set Filters</div>\n    <div class=\"popup-window-body\">\n      <div class=\"tabbable\">\n        <ul id=\"filter-tabs\" class=\"nav nav-tabs popup-window-nav\">\n          <li class=\"active\"><a href=\"#multiview-filter-general\" data-toggle=\"tab\">General</a></li>\n          <li><a href=\"#multiview-filter-condition\" data-toggle=\"tab\">Condition</a></li>\n          <li><a href=\"#multiview-filter-formula\" data-toggle=\"tab\">Formula</a></li>\n        </ul>\n        <div class=\"tab-content tab-content-border tab-content-padding\">\n          <div class=\"tab-pane active\" id=\"multiview-filter-general\">\n              <div class=\"field-block\">\n                <label class=\"radio\">\n                    <input type=\"radio\" name=\"filterGeneralLogicRadios\" value=\"\"> Include\n                </label>\n                <label class=\"radio\">\n                    <input type=\"radio\" name=\"filterGeneralLogicRadios\" value=\"\"> Exclude\n                </label>\n              </div>\n                \n              <div class=\"field-block\">\n                <button class=\"btn-popup\" id=\"multiview-filter-btn-all\">All</button>\n                <button class=\"btn-popup\" id=\"multiview-filter-btn-none\">None</button>\n              </div>\n\n              <div class=\"field-block\" style=\"margin-left:20px;\">\n                <label class=\"checkbox\">\n                  <input type=\"checkbox\" value=\"\">\n                  Kitchenware\n                </label>\n                <label class=\"checkbox\">\n                  <input type=\"checkbox\" value=\"\">\n                  Office Supplies\n                </label>\n                <label class=\"checkbox\">\n                  <input type=\"checkbox\" value=\"\">\n                  Computer Peripherals\n                </label>\n                <label class=\"checkbox\">\n                  <input type=\"checkbox\" value=\"\">\n                  Furniture\n                </label>\n                <label class=\"checkbox\">\n                  <input type=\"checkbox\" value=\"\">\n                  Home Appliance\n                </label>\n                <label class=\"checkbox\">\n                  <input type=\"checkbox\" value=\"\">\n                  Auto Parts\n                </label>\n              </div>\n\n          </div>\n          <div class=\"tab-pane\" id=\"multiview-filter-condition\">\n\n              <div class=\"field-block\">\n                <label class=\"radio\">\n                    <input type=\"radio\" name=\"filterConditionLogicRadios\" value=\"\"> Include\n                </label>\n                <label class=\"radio\">\n                    <input type=\"radio\" name=\"filterConditionLogicRadios\" value=\"\"> Exclude\n                </label>\n              </div>\n              \n              <div class=\"field-block\" style=\"margin-left:20px;\">\n                <input class=\"input-filter float-right\" id=\"focusedInput\" type=\"text\" placeholder=\"Input conditions...\">\n                <label class=\"radio\">\n                  <input type=\"radio\" name=\"filterConditionOptionsRadios\" value=\"\">\n                  Contains\n                </label>\n                <label class=\"radio\">\n                  <input type=\"radio\" name=\"filterConditionOptionsRadios\" value=\"\">\n                  Starts with\n                </label>\n                <label class=\"radio\">\n                  <input type=\"radio\" name=\"filterConditionOptionsRadios\" value=\"\">\n                  Ends with\n                </label>\n                <label class=\"radio\">\n                  <input type=\"radio\" name=\"filterConditionOptionsRadios\" value=\"\">\n                  Exactly matches\n                </label>\n              </div>\n\n          </div>\n          <div class=\"tab-pane\" id=\"multiview-filter-formula\">\n            <div class=\"\">\n              <label class=\"radio\">\n                <input type=\"radio\" name=\"filterFormulaOptionsRadios\" value=\"\">\n                By Field\n              </label>  \n            </div>\n            <div class=\"field-block\" style=\"margin-left:20px\">\n              <div>\n                  <div class=\"float-right\">By</div>\n                  <select class=\"select\">\n                    <option>1</option>\n                    <option>2</option>\n                    <option>3</option>\n                  </select>\n                  <select class=\"select\">\n                    <option>1</option>\n                    <option>2</option>\n                    <option>3</option>\n                  </select>\n              </div>\n              <div>\n                  <select class=\"select\">\n                    <option>Dimention</option>\n                    <option>2</option>\n                    <option>3</option>\n                  </select>\n                  <select class=\"select\">\n                    <option>Sum</option>\n                    <option>2</option>\n                    <option>3</option>\n                  </select>\n              </div>\n            </div>\n            <div class=\"\">\n              <label class=\"radio\">\n                <input type=\"radio\" name=\"filterFormulaOptionsRadios\" value=\"\">\n                By Formula\n              </label>  \n            </div>\n            <div class=\"field-block\" style=\"margin-left:20px\">\n              <div>\n                  <select class=\"select\">\n                    <option>Dimention</option>\n                    <option>2</option>\n                    <option>3</option>\n                  </select>\n                  <select class=\"select\">\n                    <option>Sum</option>\n                    <option>2</option>\n                    <option>3</option>\n                  </select>\n              </div>\n              <div>\n                  <select class=\"select\">\n                    <option>></option>\n                    <option>=</option>\n                    <option><</option>\n                    <option><=</option>\n                    <option>>=</option>\n                  </select>\n                  <input style=\"width:76px; height:10px; margin:0; background-color:#9da2a4;\" type=\"text\">\n              </div>\n            </div>\n            <div class=\"border-box\" style=\"margin-left:20px\">\n              <label>Minimum <input class=\"input-filter\" type=\"text\">\n              </label> \n              <label>Maximum <input class=\"input-filter\" type=\"text\">\n              </label> \n            </div>          \n          </div>\n        </div>\n    </div>\n  </div>\n  <div class=\"popup-window-footer\">\n    <button class=\"btn-popup\"><a>Reset</a></button>\n    <button type=\"submit\" class=\"btn-popup pull-right\">{{#linkTo \"multiview\"}}Confirm{{/linkTo}}</button>\n    <button class=\"btn-popup pull-right\">{{#linkTo \"multiview\"}}Cancel{{/linkTo}}</button>\n  </div>\n  </div>\n</div>\n\n<script type=\"text/javascript\" charset=\"utf-8\">\n$(function () {\n  $('#filter-tabs a:first').tab('show');\n});\n</script>\n");