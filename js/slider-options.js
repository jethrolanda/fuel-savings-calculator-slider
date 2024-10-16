jQuery(document).ready(function ($) {
  var fuel_savings_calculator = $("body").find("#fuel-savings-calculator");

  var weeks = 52;
  var months = 12;
  var rate_per_minute = 0;
  var minutes_in_an_hour = 60;
  var total_gallons = 0;
  var estimated_savings_annually;

  var calculateSavedFuel = function () {
    // Update Estimated Savings
    var a = parseInt($("#estimated-gallons-per-fill-input").val());
    var b = parseInt($("#number-of-units-input").val());
    var c = parseInt($("#number-of-operators-input").val());
    var d = parseInt($("#hourly-rate-input").val());
    var e = parseInt($("#round-trip-per-fueling-input").val());
    var f = parseInt($("#frequency-of-fueling-input").val());

    total_gallons = a * b * f * weeks;
    rate_per_minute = d / 60;
    estimated_savings_annually = rate_per_minute * e * c * b * f * weeks;

    // Estimated Gallons Consumed per Month
    var estimated_gallons_consumed_per_month = (a * b * f * weeks) / months;
    estimated_gallons_consumed_per_month = Math.round(
      estimated_gallons_consumed_per_month
    );

    // Man Hours Allocated to Fueling per Week
    var man_hours_allocated_to_fueling_per_week =
      (e * c * b * f) / minutes_in_an_hour;
    man_hours_allocated_to_fueling_per_week = Math.round(
      man_hours_allocated_to_fueling_per_week
    );

    // Hours Lost Per Week / Lost Assets and Labor Hours
    var lost_assets_and_labor_hours = (b * e * f) / minutes_in_an_hour;
    if (lost_assets_and_labor_hours > 0) {
      lost_assets_and_labor_hours = lost_assets_and_labor_hours.toLocaleString(
        "en-US",
        {
          maximumFractionDigits: 2
        }
      );
      $("#lost-assets-and-labor-hours").text(lost_assets_and_labor_hours);
    }

    // Labor Cost Per Week / Estimated Cost of Self Fueling / Labor Savings Per Week
    var labor_savings_per_week = rate_per_minute * e * c * b * f;
    labor_savings_per_week = Math.round(labor_savings_per_week);
    labor_savings_per_week = "$" + labor_savings_per_week.toLocaleString();
    $("#labor-savings-per-week").text(labor_savings_per_week);

    // Added Cost Per Gallon / Every Gallon You Pump Costs You An Additional
    var additional_costs = "$0";
    if (total_gallons > 0 && estimated_savings_annually > 0) {
      additional_costs = estimated_savings_annually / total_gallons;
      additional_costs =
        "$" +
        additional_costs.toLocaleString("en-US", { maximumFractionDigits: 2 });
      $("#every-gallon-you-pump-costs-an-additional").html(
        "<span style='color: #ce5353;'>+</span>" + additional_costs
      );
    }

    $("span#gallons-per-week").text(b * f * a);
    $("span#per-gallon").text(additional_costs);

    // Estimated Savings Annually Display
    estimated_savings_annually = Math.round(estimated_savings_annually);
    estimated_savings_annually =
      "$" +
      estimated_savings_annually.toLocaleString("en-US", {
        maximumFractionDigits: 2
      });
    $("#estimated-savings-annually").text(estimated_savings_annually);

    var data = {
      // Slider data
      number_of_operators: c,
      number_of_units_in_fleet: b,
      frequency_of_fueling: f,
      round_trip_per_fueling: e,
      estimated_gallons_per_fill: a,
      average_hourly_rate: d,
      // Calculations data
      every_gallon_you_pump_cost_an: additional_costs,
      estimated_gallons_consumed_per_week: (
        estimated_gallons_consumed_per_month / 7
      ).toLocaleString("en-US", { maximumFractionDigits: 2 }),
      man_hours_allocated_to_fueling_per_week:
        man_hours_allocated_to_fueling_per_week,
      lost_asset_production_hours_per_week: lost_assets_and_labor_hours,
      estimated_cost_of_self_fueling_per_week: labor_savings_per_week,
      yearly_fuel_savings: estimated_savings_annually
    };

    // Store data to div attr
    $("div.fuel-savings-calculator-wrapper").attr(
      "data-calculator",
      encodeURIComponent(JSON.stringify(data))
    );
  };

  fuel_savings_calculator.find('input[type="range"]').rangeslider({
    // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,

    // Default CSS classes
    // rangeClass: 'rangeslider',
    // disabledClass: 'rangeslider--disabled',
    // horizontalClass: 'rangeslider--horizontal',
    // verticalClass: 'rangeslider--vertical',
    // fillClass: 'rangeslider__fill',
    // handleClass: 'rangeslider__handle',

    // Callback function
    onInit: function () {
      calculateSavedFuel();
    },

    // Callback function
    onSlide: function (position, value) {
      // Change input values
      var id = this.$element.attr("id");
      if (id) {
        $("#" + id + "-input").val(value);
      }

      calculateSavedFuel();
    },

    // Callback function
    onSlideEnd: function (position, value) {}
  });

  fuel_savings_calculator.find('input[type="text"]').on("keyup", function () {
    var id = $(this).attr("id");
    var value = parseInt(this.value);

    if (value === undefined) return;

    switch (id) {
      case "estimated-gallons-per-fill-input":
        $("#estimated-gallons-per-fill").val(value).change();
        break;

      case "number-of-units-input":
        $("#number-of-units").val(value).change();
        break;

      case "number-of-operators-input":
        $("#number-of-operators").val(value).change();
        break;

      case "hourly-rate-input":
        $("#hourly-rate").val(value).change();
        break;

      case "round-trip-per-fueling-input":
        $("#round-trip-per-fueling").val(value).change();
        break;

      case "frequency-of-fueling-input":
        $("#frequency-of-fueling").val(value).change();
        break;
    }
  });
});
