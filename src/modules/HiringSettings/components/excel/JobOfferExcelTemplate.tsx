import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { BorderStyle } from "exceljs";
import { ExportOptions } from "@modules/HiringSettings/types"

export const JobOfferExcelTemplate = async ({
    data,
    fileName = "download.xlsx",
    sheetName = "Sheet1",
    image,
    customStylingFn,
}: ExportOptions) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = [
        { width: 10 },
        { width: 36 },
        { width: 70 },
        { width: 40 },
        { width: 30 },
        ...Array.from({ length: 5 }, () => ({})),
    ];


    const MIN_ROW_HEIGHT = 30;
    const MAX_ROW_HEIGHT = 250;
    const CHARACTERS_PER_LINE = 60 * 2.5; // Adjust this based on column width

    data.forEach((row, rowIndex) => {
        let maxLines = 1; // Track max number of lines in a row

        row.forEach((cell, colIndex) => {
            let text = cell.value?.toString() || "";

            // Estimate line count based on character length
            let estimatedLines = Math.ceil(text.length / CHARACTERS_PER_LINE);
            maxLines = Math.max(maxLines, estimatedLines); // Track highest line count in row

            const excelCell = worksheet.getCell(rowIndex + 1, colIndex + 1);
            excelCell.value = text;
            excelCell.alignment = { wrapText: true, vertical: "top" };

            // Apply styles based on className
            if (cell.className === "header") {
                excelCell.font = { bold: true, size: 14, name: "Arial" };
                excelCell.alignment = { horizontal: "left", wrapText: true };
            }

            if (cell.className === "text-title") {
                excelCell.font = { italic: true, bold: true, size: 12, name: "Arial" };
            }

            excelCell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });


        if (rowIndex === 4) {
            worksheet.mergeCells(5, 3, 5, 5)
        }
        if (rowIndex === 5) {
            worksheet.mergeCells(6, 3, 6, 5)
        }
        if (rowIndex === 6) {
            worksheet.mergeCells(7, 3, 7, 5)
        }
        if (rowIndex === 7) {
            worksheet.mergeCells(8, 3, 8, 5)
        }
        if (rowIndex === 8) {
            worksheet.mergeCells(9, 2, 9, 5)
        }
        if (rowIndex === 9) {
            worksheet.mergeCells(10, 4, 10, 5)
        }
        if (rowIndex === 10) {
            worksheet.mergeCells(11, 3, 11, 5)
        }
        if (rowIndex === 11) {
            worksheet.mergeCells(12, 3, 12, 5)
        }
        if (rowIndex === 12) {
            worksheet.mergeCells(13, 3, 13, 5)
        }
        if (rowIndex === 13) {
            worksheet.mergeCells(14, 3, 14, 5)
        }
        if (rowIndex === 14) {
            worksheet.mergeCells(15, 3, 15, 5)
        }
        if (rowIndex === 15) {
            worksheet.mergeCells(16, 3, 16, 5)
        }
        if (rowIndex === 16) {
            worksheet.mergeCells(17, 3, 17, 5)
        }
        if (rowIndex === 17) {
            worksheet.mergeCells(18, 3, 18, 5)
        }
        if (rowIndex === 18) {
            worksheet.mergeCells(19, 3, 19, 5)
        }
        if (rowIndex === 19) {
            worksheet.mergeCells(20, 3, 20, 5)
        }
        if (rowIndex === 20) {
            worksheet.mergeCells(21, 3, 21, 5)
        }
        if (rowIndex === 21) {
            worksheet.mergeCells(22, 3, 22, 5)
        }
        if (rowIndex === 23) {
            worksheet.mergeCells(24, 2, 24, 5)
        }

        //  Merge Only Row 25 Across 6 Columns (C25 to D25)
        if (rowIndex === 22) { // Row index in array (0-based index)
            worksheet.mergeCells(23, 2, 23, 5); // Merge C25:D25
            const mergedCell = worksheet.getCell(23, 2);
            mergedCell.alignment = { wrapText: true, vertical: "middle", horizontal: "center" };
        }

        worksheet.getRow(4).height = 12;
        worksheet.getRow(9).height = 12;
        worksheet.getRow(13).height = 12;
        worksheet.getRow(23).height = 56; // Adjust as needed
        worksheet.getRow(24).height = 12;
        worksheet.getRow(28).height = 12;
        worksheet.getRow(29).height = 12;
        worksheet.getRow(31).height = 20;
        worksheet.getCell(32, 3).value = "New ⬛";
        worksheet.getCell(32, 4).value = "Additional ⬜";
        worksheet.getCell(32, 5).value = "Replacement ⬜";

        // Apply thick border to column B (B5 to B27)
        for (let row = 5; row <= 27; row++) {
            const cell = worksheet.getCell(row, 2); // Column B is index 2
            cell.border = {
                left: { style: "thick" as BorderStyle }, // Left frame
                ...(row === 5 && { top: { style: "thick" as BorderStyle } }), // Top frame at B5
                ...(row === 27 && { bottom: { style: "thick" as BorderStyle } }), // Bottom frame at B27
            };
        }

        // Apply thick border to column D (D7 to D27)
        for (let row = 5; row <= 27; row++) {
            const cell = worksheet.getCell(row, 5); // Column D is index 4
            cell.border = {
                right: { style: "thick" as BorderStyle }, // Right frame
                ...(row === 5 && { top: { style: "thick" as BorderStyle } }), // Top frame at D7
                ...(row === 27 && { bottom: { style: "thick" as BorderStyle } }), // Bottom frame at D27
            };
        }

        // For ePRF No.
        // Apply borders for B29 to E31
        for (let row = 29; row <= 32; row++) {
            for (let col = 2; col <= 5; col++) {
                const cell = worksheet.getCell(row, col);
                cell.border = {
                    ...(col === 2 && { left: { style: "thick" as BorderStyle } }), // Left frame at column B
                    ...(col === 5 && { right: { style: "thick" as BorderStyle } }), // Right frame at column E
                    ...(row === 29 && { top: { style: "thick" as BorderStyle } }), // Top frame spanning B29 to E29
                    ...(row === 32 && { bottom: { style: "thick" as BorderStyle } }), // Bottom frame spanning B31 to E31
                };
            }
        }

        // Ensure Cells under explicitly gets a left border
        const cellB23 = worksheet.getCell(23, 2);
        cellB23.border = {
            left: { style: "thick" as BorderStyle },
            right: { style: "thick" as BorderStyle }, // Right border
        };

        const cellB27 = worksheet.getCell(27, 3);
        cellB27.border = {
            bottom: { style: "thick" as BorderStyle },
        };

        const cellE30 = worksheet.getCell(30, 5);
        cellE30.border = {
            bottom: { style: "thick" as BorderStyle },
            right: { style: "thick" as BorderStyle },
            left: { style: "thick" as BorderStyle },
            top: { style: "thick" as BorderStyle },
        };

        const cellC30 = worksheet.getCell(30, 3);
        cellC30.border = {
            bottom: { style: "thick" as BorderStyle },
            right: { style: "thick" as BorderStyle },
            left: { style: "thick" as BorderStyle },
            top: { style: "thick" as BorderStyle },
        };

        const cellB24 = worksheet.getCell(24, 2);
        cellB24.border = {
            bottom: { style: "thick" as BorderStyle },
            left: { style: "thick" as BorderStyle },
            right: { style: "thick" as BorderStyle },
            top: { style: "thick" as BorderStyle },
        };

        const cellB9 = worksheet.getCell(9, 2);
        cellB9.border = {
            bottom: { style: "thick" as BorderStyle },
            right: { style: "thick" as BorderStyle },
            left: { style: "thick" as BorderStyle },
            top: { style: "thick" as BorderStyle },
        };

        const cellD27 = worksheet.getCell(27, 4);
        cellD27.border = {
            bottom: { style: "thick" as BorderStyle },
        };

        // Set row height based on the highest estimated lines in that row
        let calculatedHeight = Math.min(MAX_ROW_HEIGHT, Math.max(MIN_ROW_HEIGHT, maxLines * 25)); // Adjust multiplier if needed
        worksheet.getRow(rowIndex + 1).height = calculatedHeight;
    });


    if (customStylingFn) {
        customStylingFn(worksheet);
    }

    if (image) {
        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64String = (reader.result as string).split(",")[1];

                const imageId = workbook.addImage({
                    base64: base64String,
                    extension: "png",
                });

                worksheet.addImage(imageId, {
                    tl: { col: 1, row: 0 },
                    ext: { width: 550, height: 80 },
                });

                const buffer = await workbook.xlsx.writeBuffer();
                saveAs(
                    new Blob([buffer], {
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    }),
                    fileName
                );
            };
        } catch (err) {
            console.error("Image error: ", err);
        }
    } else {
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(
            new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
            fileName
        );
    }
};
