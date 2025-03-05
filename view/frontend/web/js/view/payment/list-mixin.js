define([
    'jquery'
], function ($) {
    'use strict';

    return function (Component) {
        return Component.extend({
            initObservable : function () {
                setInterval(function () {
                    $("input[type='radio'][value^='bold_']:checked").each(function() {
                        var grandparent = $(this).parent().parent();
                        var paymentMethodContent = grandparent
                            .find(".payment-method-content");
                        var agreementNotChecked = paymentMethodContent
                            .find("input[type='checkbox'][name^='agreement']:not(:checked)")
                            .length > 0;
                        var shippingMethodNotSelected = $(".amcheckout-shipping-methods")
                            .find("input[type='radio']:checked")
                            .length === 0;

                        var blockLoaderDiv = paymentMethodContent
                            .find("> div[data-bind^='blockLoader']");

                        grandparent.find('.messages').html(
                            agreementNotChecked ? '<div>* Required agreement</div>' :
                                (
                                    shippingMethodNotSelected ? '<div>* Select shipping method</div>' : ''
                                )
                        ).find('div').addClass('field-error');

                        if (agreementNotChecked || shippingMethodNotSelected) {
                            blockLoaderDiv.css({
                                "opacity": "0.2",
                                "pointer-events": "none"
                            });
                        } else {
                            blockLoaderDiv.css({
                                "opacity": "1",
                                "pointer-events": "all"
                            });
                        }
                    });

                }, 500);
                return this._super();
            }
        });
    };
});
