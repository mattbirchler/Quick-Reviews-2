// Add jQuery check
if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded');
    throw new Error('jQuery is required');
}

// Ensure DOM is ready
$(document).ready(function() {
    console.log("Loading themes.js");


    // Set Default
    $("#theme_1").click(function () {
        localStorage.setItem("container_text_color", "#ffffff");
        localStorage.setItem("container_background_color", "#2B384F");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#2B384F");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#E32401");
        localStorage.setItem("quick_score_color_2", "#FFF995");
        localStorage.setItem("quick_score_color_3", "#02C7FC");
        localStorage.setItem("quick_score_color_4", "#B1FC8C");
        localStorage.setItem("quick_score_text_color_1", "#000000");
        localStorage.setItem("quick_score_text_color_2", "#000000");
        localStorage.setItem("quick_score_text_color_3", "#000000");
        localStorage.setItem("quick_score_text_color_4", "#000000");
        $("#poor_color").val("#E32401");
        $("#okay_color").val("#FFF995");
        $("#good_color").val("#02C7FC");
        $("#great_color").val("#B1FC8C");
        location.reload();
    });

    $("#theme_2").click(function () {
        localStorage.setItem("container_text_color", "#000000");
        localStorage.setItem("container_background_color", "#F3F6FF");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#F3F6FF");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#FB8A99");
        localStorage.setItem("quick_score_color_2", "#F5F06C");
        localStorage.setItem("quick_score_color_3", "#ADBBFF");
        localStorage.setItem("quick_score_color_4", "#16D7A5");
        localStorage.setItem("quick_score_text_color_1", "#000000");
        localStorage.setItem("quick_score_text_color_2", "#000000");
        localStorage.setItem("quick_score_text_color_3", "#000000");
        localStorage.setItem("quick_score_text_color_4", "#000000");
        $("#poor_color").val("#FB8A99");
        $("#okay_color").val("#F5F06C");
        $("#good_color").val("#ADBBFF");
        $("#great_color").val("#16D7A5");
        location.reload();
    });

    $("#theme_3").click(function () {
        localStorage.setItem("container_text_color", "#ffffff");
        localStorage.setItem("container_background_color", "#E70CDF");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#E70CDF");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#ffffff");
        localStorage.setItem("quick_score_color_2", "#ffffff");
        localStorage.setItem("quick_score_color_3", "#ffffff");
        localStorage.setItem("quick_score_color_4", "#ffffff");
        localStorage.setItem("quick_score_text_color_1", "#000000");
        localStorage.setItem("quick_score_text_color_2", "#000000");
        localStorage.setItem("quick_score_text_color_3", "#000000");
        localStorage.setItem("quick_score_text_color_4", "#E70CDF");
        $("#poor_color").val("#ffffff");
        $("#okay_color").val("#ffffff");
        $("#good_color").val("#ffffff");
        $("#great_color").val("#ffffff");
        location.reload();
    });

    $("#theme_4").click(function () {
        localStorage.setItem("container_text_color", "#000000");
        localStorage.setItem("container_background_color", "#13BDFF");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#13BDFF");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#ffffff");
        localStorage.setItem("quick_score_color_2", "#ffffff");
        localStorage.setItem("quick_score_color_3", "#ffffff");
        localStorage.setItem("quick_score_color_4", "#ffffff");
        localStorage.setItem("quick_score_text_color_1", "#000000");
        localStorage.setItem("quick_score_text_color_2", "#000000");
        localStorage.setItem("quick_score_text_color_3", "#000000");
        localStorage.setItem("quick_score_text_color_4", "#000000");
        $("#poor_color").val("#ffffff");
        $("#okay_color").val("#ffffff");
        $("#good_color").val("#ffffff");
        $("#great_color").val("#ffffff");
        location.reload();
    });

    $("#theme_5").click(function () {
        localStorage.setItem("container_text_color", "#000000");
        localStorage.setItem("container_background_color", "#FEBF00");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#FEBF00");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#000000");
        localStorage.setItem("quick_score_color_2", "#000000");
        localStorage.setItem("quick_score_color_3", "#000000");
        localStorage.setItem("quick_score_color_4", "#000000");
        localStorage.setItem("quick_score_text_color_1", "#ffffff");
        localStorage.setItem("quick_score_text_color_2", "#ffffff");
        localStorage.setItem("quick_score_text_color_3", "#ffffff");
        localStorage.setItem("quick_score_text_color_4", "#ffffff");
        $("#poor_color").val("#000000");
        $("#okay_color").val("#000000");
        $("#good_color").val("#000000");
        $("#great_color").val("#000000");
        location.reload();
    });

    $("#theme_6").click(function () {
        localStorage.setItem("container_text_color", "#ffffff");
        localStorage.setItem("container_background_color", "#3B0C95");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#3B0C95");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#ED2E6E");
        localStorage.setItem("quick_score_color_2", "#ED2E6E");
        localStorage.setItem("quick_score_color_3", "#ED2E6E");
        localStorage.setItem("quick_score_color_4", "#ED2E6E");
        localStorage.setItem("quick_score_text_color_1", "#ffffff");
        localStorage.setItem("quick_score_text_color_2", "#ffffff");
        localStorage.setItem("quick_score_text_color_3", "#ffffff");
        localStorage.setItem("quick_score_text_color_4", "#ffffff");
        $("#poor_color").val("#ED2E6E");
        $("#okay_color").val("#ED2E6E");
        $("#good_color").val("#ED2E6E");
        $("#great_color").val("#ED2E6E");
        location.reload();
    });

    $("#theme_7").click(function () {
        localStorage.setItem("container_text_color", "#000000");
        localStorage.setItem("container_background_color", "#1FCBE2");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#1FCBE2");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#000000");
        localStorage.setItem("quick_score_color_2", "#000000");
        localStorage.setItem("quick_score_color_3", "#000000");
        localStorage.setItem("quick_score_color_4", "#000000");
        localStorage.setItem("quick_score_text_color_1", "#ffffff");
        localStorage.setItem("quick_score_text_color_2", "#ffffff");
        localStorage.setItem("quick_score_text_color_3", "#ffffff");
        localStorage.setItem("quick_score_text_color_4", "#ffffff");
        $("#poor_color").val("#000000");
        $("#okay_color").val("#000000");
        $("#good_color").val("#000000");
        $("#great_color").val("#000000");
        location.reload();
    });

    $("#theme_8").click(function () {
        localStorage.setItem("container_text_color", "#ffffff");
        localStorage.setItem("container_background_color", "#E5322F");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#E5322F");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#ECECEC");
        localStorage.setItem("quick_score_color_2", "#ECECEC");
        localStorage.setItem("quick_score_color_3", "#ECECEC");
        localStorage.setItem("quick_score_color_4", "#ECECEC");
        localStorage.setItem("quick_score_text_color_1", "#000000");
        localStorage.setItem("quick_score_text_color_2", "#000000");
        localStorage.setItem("quick_score_text_color_3", "#000000");
        localStorage.setItem("quick_score_text_color_4", "#000000");
        $("#poor_color").val("#ECECEC");
        $("#okay_color").val("#ECECEC");
        $("#good_color").val("#ECECEC");
        $("#great_color").val("#ECECEC");
        location.reload();
    });

    $("#theme_9").click(function () {
        localStorage.setItem("container_text_color", "#000000");
        localStorage.setItem("container_background_color", "#EE9882");
        // Darken color & set page background
        // getAndSetPageBackgroundColor(localStorage.getItem("container_background_color"));
        $("#background_color").val("#EE9882");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#000000");
        localStorage.setItem("quick_score_color_2", "#000000");
        localStorage.setItem("quick_score_color_3", "#000000");
        localStorage.setItem("quick_score_color_4", "#000000");
        localStorage.setItem("quick_score_text_color_1", "#ffffff");
        localStorage.setItem("quick_score_text_color_2", "#ffffff");
        localStorage.setItem("quick_score_text_color_3", "#ffffff");
        localStorage.setItem("quick_score_text_color_4", "#ffffff");
        $("#poor_color").val("#000000");
        $("#okay_color").val("#000000");
        $("#good_color").val("#000000");
        $("#great_color").val("#000000");
        location.reload();
    });

    $("#theme_10").click(function () {
        localStorage.setItem("container_text_color", "#ffffff");
        localStorage.setItem("container_background_color", "#38571A");
        $("#background_color").val("#38571A");
        $("#title").css("color", localStorage.getItem("container_text_color"));
        $("#metadata").css("color", localStorage.getItem("container_text_color"));
        $("#review").css("color", localStorage.getItem("container_text_color"));
        $("#review").css(
            "background-color",
            localStorage.getItem("container_background_color")
        );
        $("#bottom").css(
            "border-color",
            pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        $("#poster").css(
            "border",
            "9px solid " + pSBC(-0.5, localStorage.getItem("container_background_color"))
        );
        localStorage.setItem("quick_score_color_1", "#ffffff");
        localStorage.setItem("quick_score_color_2", "#ffffff");
        localStorage.setItem("quick_score_color_3", "#ffffff");
        localStorage.setItem("quick_score_color_4", "#ffffff");
        localStorage.setItem("quick_score_text_color_1", "#000000");
        localStorage.setItem("quick_score_text_color_2", "#000000");
        localStorage.setItem("quick_score_text_color_3", "#000000");
        localStorage.setItem("quick_score_text_color_4", "#000000");
        $("#poor_color").val("#ffffff");
        $("#okay_color").val("#ffffff");
        $("#good_color").val("#ffffff");
        $("#great_color").val("#ffffff");
        location.reload();
    });
});