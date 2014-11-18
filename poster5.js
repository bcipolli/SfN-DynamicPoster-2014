/* Builds the poster cover-page elements */
$(function() {

    $('.poster-title').each(function() {
        // Add the left logo, center area, right QR code.
        //  data-logo="logo.png"
        //  data-qrcode="qrcode.png"
        //  data-title="Blah"
        //  data-authors="Ben Cipollini, Garrison Cottrell"
        //  data-affiliations="UC San Diego, Department of Computer Science"
        //  data-author-affiliations="1,1">

        var title_div = $(this);
        var d = title_div.data();
        title_div.append("<div class='spacer logo'><img src='" + d["logo"] + "' /></div>");
        title_div.append("<div class='content'>"
            + "<div class='title'>" + d["title"] + "</div>"
            + "<div class='authors'>" + d["authors"] + "</div>"
            + "<div class='affiliations'>" + d["affiliations"] + "</div>"
            + "</div>");
        title_div.append("<div class='spacer qrcode'>"
            + "<div class='download-text'>Download poster now!</div>"
            + "<img src='" + d["qrcode"] + "' /></div>");
    });

    $('.section').each(function(idx) {

        //data-number
        //data-title="Are human brains lateralized because they are large?"
        //data-image=""
        //data-blurb="The human brain is highly lateralized and somehat large.  Are the to connected?"
        var section_div = $(this);
        var d = section_div.data();
        section_div.attr("id", "section" + idx);

        // Move children to the main content.
        var main_div = $('#main-content');
        var children = section_div.children();
        var details_div_id = "details" + idx;

        section_div.data["details_div_id"] = details_div_id
        main_div.append("<div id='" + details_div_id + "' class='section-details'>details</div>");
        var details_div = main_div.find('#' + details_div_id);
        details_div.append(children);
        //section_div.remove(children);

        // Add the data to the actual div
        section_div.append("<div class='number'>" + d["number"] + "</div>");
        section_div.append("<div class='title'>" + d["title"] + "&nbsp;</div>");
        if (d["image"]) {
            section_div.append("<div class='image'><img src='" + d["image"] + "' /></div>");
        }
        section_div.append("<div class='blurb'>" + d["blurb"] + "</div>");


        // Show the relevant details, and make the buttons active.
        $(this).on('click', function() {
            $('.section-details').hide();
            $("#" + details_div_id).show();
            console.log("#" + details_div_id);
        });
    });

});


/* Builds the poster main section elements */

/* Connects events to poster elements */
$(function() {
    var ad_fast = 200;
    var ad_slow = 500;

    $('.section-buttons-expanded .section').on('click', function(e){
        e.preventDefault();

        // Expand the main content, shrink the summaries
        $('#main-content').toggleClass('main-content-collapsed', false, ad_slow);
        $('.section-buttons').toggleClass('section-buttons-expanded', false, ad_slow);
        $('.section').toggleClass('section-button', true, ad_slow);
        $('.section').find("img").hide(); // hide all images
    });

    $('.section').on('click', function(e) {
        e.preventDefault();

        // Turn off all but one of the summaries
        $('.section').toggleClass('section-summary-on', false, ad_slow);
        $(this).toggleClass('section-summary-on', true, ad_slow);
        $('#main-content').toggleClass('main-content-on', true, ad_slow);
    });

    // Set rounded corners on the right sides of left summaries
    $('#section-summary-left .section-summary').on('click', function(e) {
        $('.section-summary').toggleClass('section-summary-left-on', false);
        $('.section-summary').toggleClass('section-summary-right-on', false);
        $(this).toggleClass('section-summary-left-on'); });

    // Set rounded corners on the left sides of right summaries
    $('#section-summary-right .section-summary').on('click', function(e) {
        $('.section-summary').toggleClass('section-summary-left-on', false);
        $('.section-summary').toggleClass('section-summary-right-on', false);
        $(this).toggleClass('section-summary-right-on');
    });
});

var abc;

/* Now, parse out the bookmark */
$(function() {
    if (window.location.hash && window.location.hash.length > 1 && window.location.hash.substr(0,2) == "#b") {
        $("#section" + window.location.hash.substr(2)).click()
    }
});
