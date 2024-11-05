/**
 * @file
 * Commerce discount admin helper.
 */

(function ($, Backdrop) {
  Backdrop.behaviors.commerceDiscount = {};
  Backdrop.behaviors.commerceDiscount.attach = function(context) {
    $('input:radio').change(function() {
      $('input:radio:not(:checked)').closest('div').removeClass('selected');
      $(this).closest('div').addClass('selected');
    }).filter(':checked').closest('div').addClass('selected');

    // Provide the vertical tab summaries.
    $('fieldset#edit-commerce-discount-fields-additional-settings-discount-options', context).backdropSetSummary(function(context) {
      var values = [];
      $("input[name^='status']:checked", context).parent().each(function() {
        values.push(Backdrop.checkPlain($(this).text().trim()));
      });
      values.push(Backdrop.t("Sort order: @Sort order", {'@Sort order': $("select[name^='sort_order'] option:selected").val()}));
      return values.join(', ');
    });
    $('fieldset#edit-commerce-discount-fields-additional-settings-commerce-discount-compatibility', context).backdropSetSummary(function(context) {
      var values = [],
          value;

      value = $('input[name="commerce_discount_fields[commerce_compatibility_strategy][und]"]:checked', context).val();
      if (value == 'any') {
        return Backdrop.t('Compatible with all');
      }
      else if (value == 'only' || value == 'except') {
        selected = $('input[name^="commerce_discount_fields[commerce_compatibility_selection]"][name$="[target_id]"]', context).each(function (context) {
          var ruleName = Backdrop.checkPlain($(this).val().replace(/ \(\d+\)/, '').trim());
          if (ruleName != '') {
            values.push(ruleName);
          }
        });
        if (value == 'only') {
          if (values.length == 0) {
            return Backdrop.t('Incompatible with all');
          }
          else if (values.length == 1) {
            return Backdrop.t('Only with @selected', {'@selected': values.shift()});
          }
          else {
            return Backdrop.t('Only with @selected and @remaining more...', {'@selected': values.shift(), '@remaining': values.length});
          }
        }
        else {
          if (values.length == 0) {
            return Backdrop.t('Compatible with all');
          }
          else if (values.length == 1) {
            return Backdrop.t('All except @selected', {'@selected': values.shift()});
          }
          else {
            return Backdrop.t('All except @selected and @remaining more...', {'@selected': values.shift(), '@remaining': values.length});
          }
        }
      }
      else if (value == 'none') {
        return Backdrop.t('Incompatible with all');
      }
    });
    $('fieldset#edit-commerce-discount-fields-additional-settings-discount-date', context).backdropSetSummary(function(context) {
      var fromDate,
          toDate,
          fromDateTS,
          toDateTS;

      fromDate = $('input[name="commerce_discount_fields[commerce_discount_date][und][0][value][date]"]').val();
      fromDateTS = fromDate ? new Date(fromDate) : 0;
      toDate = $('input[name="commerce_discount_fields[commerce_discount_date][und][0][value2][date]"]').val();
      toDateTS = toDate ? new Date(toDate) : 0;

      options = {
        '!from': fromDateTS < Date.now() ? Backdrop.t('Started') : Backdrop.t('Starts'),
        '!to': toDateTS < Date.now() ? Backdrop.t('Ended') : Backdrop.t('Ends'),
        '@fromDate': fromDate,
        '@toDate': toDate
      };

      if (fromDate && toDate) {
        options['!to'] = options['!to'].toLowerCase();
        return Backdrop.t('!from @fromDate and !to @toDate', options);
      }
      else if (fromDate && !toDate) {
        return Backdrop.t('!from @fromDate', options);
      }
      else if (!fromDate && toDate) {
        return Backdrop.t('!to @toDate', options);
      }
      else {
        return Backdrop.t('Always active');
      }
    });
    $('fieldset#edit-commerce-discount-fields-additional-settings-commerce-discount-usage', context).backdropSetSummary(function(context) {
      var usagePerPerson = $('input[name="commerce_discount_fields[discount_usage_per_person][und][0][value]"]').val(),
          overallUsage = $('input[name="commerce_discount_fields[discount_usage_limit][und][0][value]"]').val(),
          values = [];

      values.push(Backdrop.t('!usagePerPerson per person', {'!usagePerPerson': usagePerPerson > 0 ? Backdrop.checkPlain(usagePerPerson) : '&#8734;'}));
      values.push(Backdrop.t('!overallUsage total', {'!overallUsage': overallUsage > 0 ? Backdrop.checkPlain(overallUsage) : '&#8734;'}));

      return values.join(', ');
    });
  };
}(jQuery, Backdrop));
