#include <crow.h> 
#include <crow/json.h> 
int main() {crow::SimpleApp app;
crow::SimpleApp app;
CROW_ROUTE(app, "/")([]()
                     { return "Crow server is running!"; });

// Calculator route
CROW_ROUTE(app, "/calculate").methods("POST"_method)([](const crow::request &req)
                                                     {
        auto json = crow::json::load(req.body);
        if (!json) {
            return crow::response(400, "Invalid JSON");
        }

        double num1 = json["num1"].d();
        double num2 = json["num2"].d();
        std::string op = json["operator"].s();

        double result = 0.0;
        if (op == "+") result = num1 + num2;
        else if (op == "-") result = num1 - num2;
        else if (op == "*") result = num1 * num2;
        else if (op == "/") {
            if (num2 == 0) return crow::response(400, "Division by zero");
            result = num1 / num2;
        } else {
            return crow::response(400, "Invalid operator");
        }

        crow::json::wvalue response({{"result", result}});
        return crow::response(response); });

app.port(18080).multithreaded().run();
return 0;
}
