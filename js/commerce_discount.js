/**
 * @file
 * Commerce discount admin helper.
 */

(function ($, Drupal) {
  Drupal.behaviors.commerceDiscount = {};
  Drupal.behaviors.commerceDiscount.attach = function(context) {
    $('input:radio').change(function() {
      $('input:radio:not(:checked)').closest('div').removeClass('selected');
      $(this).closest('div').addClass('selected');
    }).filter(':checked').closest('div').addClass('selected');

    // Provide the vertical tab summaries.
    $('fieldset#edit-commerce-discount-fields-additional-settings-discount-options', context).drupalSetSummary(function(context) {
      var vals = [];
      $("input[name^='status']:checked", context).parent().each(function() {
        vals.push(Drupal.checkPlain($(this).text().trim()));
      });
      vals.push(Drupal.t("Sort order: @Sort order", {'@Sort order': $("select[name^='sort_order'] option:selected").val()}));
      return vals.join(', ');
    });
    $('fieldset#edit-commerce-discount-fields-additional-settings-commerce-discount-compatibility', context).drupalSetSummary(function(context) {
      var vals = [],
          val;

      val = $('input[name="commerce_discount_fields[commerce_compatibility_strategy][und]"]:checked', context).val();
      if (val == 'any') {
        return Drupal.t('Compatible with all');
      }
      else if (val == 'only' || val == 'except') {
        selected = $('input[name^="commerce_discount_fields[commerce_compatibility_selection]"][name$="[target_id]"]', context).each(function (context) {
          var ruleName = Drupal.checkPlain($(this).val().replace(/ \(\d+\)/, '').trim());
          if (ruleName != '') {
            vals.push(ruleName);
          }
        });
        if (val == 'only') {
          if (vals.length == 0) {
            return Drupal.t('Incompatible with all');
          }
          else if (vals.length == 1) {
            return Drupal.t('Only with @selected', {'@selected': vals.shift()});
          }
          else {
            return Drupal.t('Only with @selected and @remaining more...', {'@selected': vals.shift(), '@remaining': vals.length});
          }
        }
        else {
          if (vals.length == 0) {
            return Drupal.t('Compatible with all');
          }
          else if (vals.length == 1) {
            return Drupal.t('All except @selected', {'@selected': vals.shift()});
          }
          else {
            return Drupal.t('All except @selected and @remaining more...', {'@selected': vals.shift(), '@remaining': vals.length});
          }
        }
      }
      else if (val == 'none') {
        return Drupal.t('Incompatible with all');
      }
    });
    $('fieldset#edit-commerce-discount-fields-additional-settings-discount-date', context).drupalSetSummary(function(context) {
      var fromDate,
          toDate,
          fromDateTS,
          toDateTS;

      fromDate = $('input[name="commerce_discount_fields[commerce_discount_date][und][0][value][date]"]').val();
      fromDateTS = fromDate ? new Date(fromDate) : 0;
      toDate = $('input[name="commerce_discount_fields[commerce_discount_date][und][0][value2][date]"]').val();
      toDateTS = toDate ? new Date(toDate) : 0;

      options = {
        '!from': fromDateTS < Date.now() ? Drupal.t('Started') : Drupal.t('Starts'),
        '!to': toDateTS < Date.now() ? Drupal.t('Ended') : Drupal.t('Ends'),
        '@fromDate': fromDate,
        '@toDate': toDate
      };

      if (fromDate && toDate) {
        options['!to'] = options['!to'].toLowerCase();
        return Drupal.t('!from @fromDate and !to @toDate', options);
      }
      else if (fromDate && !toDate) {
        return Drupal.t('!from @fromDate', options);
      }
      else if (!fromDate && toDate) {
        return Drupal.t('!to @toDate', options);
      }
      else {
        return Drupal.t('Always active');
      }
    });
    $('fieldset#edit-commerce-discount-fields-additional-settings-commerce-discount-usage', context).drupalSetSummary(function(context) {
      var usagePerPerson = $('input[name="commerce_discount_fields[discount_usage_per_person][und][0][value]"]').val(),
          overallUsage = $('input[name="commerce_discount_fields[discount_usage_limit][und][0][value]"]').val(),
          vals = [];

      vals.push(Drupal.t('!usagePerPerson per person', {'!usagePerPerson': usagePerPerson > 0 ? Drupal.checkPlain(usagePerPerson) : '&#8734;'}));
      vals.push(Drupal.t('!overallUsage total', {'!overallUsage': overallUsage > 0 ? Drupal.checkPlain(overallUsage) : '&#8734;'}));

      return vals.join(', ');
    });
  };
}(jQuery, Drupal));
