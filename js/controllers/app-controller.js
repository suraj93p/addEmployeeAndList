define(['app', 'appService'], function (app) {
    /**
     * Angular application controller
     */
    app.controller('orgChartAppController', ['$scope', 'appService', function ($scope, appService) {
        $scope.editDetails = function () {
            var editIndex = this.$index, checkIndex = 0;
            $('#employeeListTable').find('tbody').find('tr').each(function () {
                if (checkIndex === editIndex) {
                    var colIndex = 0;
                    $(this).find('td').each(function () {
                        if (0 === colIndex || 2 === colIndex) {
                            $(this).attr("contentEditable", "true");
                            $(this).focus();
                        } else {
                            $(this).attr("contentEditable", "false");
                        }
                        colIndex++;
                    });
                } else {
                    $(this).find('td').each(function () {
                        $(this).attr("contentEditable", "false");
                    });
                }
                checkIndex++;
            });
        };
        $scope.updateEmployee = function () {
            var editIndex = this.$index, checkIndex = 0, name = "", title = "";
            $('#employeeListTable').find('tbody').find('tr').each(function () {
                if (checkIndex === editIndex) {
                    var colIndex = 0;
                    $(this).find('td').each(function () {
                        if (0 === colIndex) {
                            name = $(this).text();
                        } else if (2 === colIndex) {
                            title = $(this).text();
                        }
                        colIndex++;
                    });
                }
                checkIndex++;
            });
            localStorage.removeItem(this.employee.lastName.toUpperCase() + this.employee.firstName);
            var userObj = {
                'lastName': name.split(' ')[name.split(' ').length - 1],
                'firstName': name.replace(name.split(' ')[name.split(' ').length - 1], ''),
                'email': this.employee.email,
                'title': title,
                'role': this.employee.role,
                'social_urls': this.employee.social_urls,
                'isPrimaryCompany': this.employee.isPrimaryCompany,
                'isFromScript': true
            };
            appService.storeUser(userObj);
            $scope.employees = appService.getEmployeeList();
        };
        $scope.deleteEmployee = function () {
            localStorage.removeItem(this.employee.lastName.toUpperCase() + this.employee.firstName);
            $scope.employees = appService.getEmployeeList();
        };
        $scope.clearStorage = function () {
            localStorage.clear();
            $("#employeeList").modal("hide");
            appService.resetForm($scope);
        };
        $scope.addUser = function () {
            this.input.social_urls = appService.separateSocialAccounts(this.input.social_urls);
            var userObj = {
                'firstName': this.input.firstName,
                'lastName': this.input.lastName,
                'email': this.input.email,
                'title': this.input.title,
                'role': this.input.role,
                'social_urls': this.input.social_urls,
                'isPrimaryCompany': this.input.isPrimaryCompany || false,
                'isFromScript': true
            };
            appService.storeUser(userObj);
            $("#employeeForm").modal("hide");
            appService.showToast($scope, messages.labels.userAdded);
            appService.resetForm($scope);
        };
        $scope.showModalEmployeeList = function () {
            $scope.employees = appService.getEmployeeList();
            $('#searchTerm').focus();
            $("#employeeList").modal("show");
        };
        $scope.filterEmployee = function () {
            var filterText = $scope.searchTerm.toUpperCase();
            var table = document.getElementById("employeeListTable");
            var tr = table.getElementsByTagName("tr");
            for (var i = 1; i < tr.length; i++) {
                var td = tr[i].getElementsByTagName("td");
                var tdArray = Array.from(td);
                if (tdArray.length > 0) {
                    for (var j = 0; j < tdArray.length; ++j) {
                        var currText = tdArray[j].innerText;
                        if (currText.toUpperCase().indexOf(filterText) > -1) {
                            tr[i].style.display = "";
                            break;
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
            }
        };
        $scope.showOrganisationTree = function () {
            $("#organisationTree").modal("show");
        };
        appService.setLabels($scope);
        appService.setPredefinedData();
    }]);
});