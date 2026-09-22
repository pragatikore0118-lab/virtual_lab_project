from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import subprocess
import tempfile
import os
import sys
# Home Page
def home(request):
    return render(request, 'lab/home.html')


# Dashboard
def dashboard(request):
    return render(request, 'lab/dashboard.html')


# Data Structures
def data_structures(request):
    return render(
        request,
        'lab/data_structures.html'
    )


# ==============================
# STACK
# ==============================

def stack(request):
    return render(
        request,
        'lab/stack.html'
    )


# ==============================
# QUEUE
# ==============================

def queue(request):
    return render(
        request,
        'lab/queue.html'
    )


# ==============================
# SINGLY LINKED LIST
# ==============================

def singly_linked_list(request):
    return render(
        request,
        'lab/singly_linked_list.html'
    )


def sll_visualization(request):
    return render(
        request,
        'lab/sll_visualization.html'
    )


# ==============================
# DOUBLY LINKED LIST
# ==============================

def doubly_linked_list(request):
    return render(
        request,
        'lab/doubly_linked_list.html'
    )


def dll_visualization(request):
    return render(
        request,
        'lab/dll_visualization.html'
    )


# ==============================
# SEARCHING
# ==============================

def searching(request):
    return render(
        request,
        'lab/searching.html'
    )


def searching_visualization(request):
    return render(
        request,
        'lab/searching_visualization.html'
    )


# =========================
# SORTING MAIN PAGE
# =========================

def sorting(request):
    return render(
        request,
        'lab/sorting.html'
    )


# =========================================
# BUBBLE SORT
# =========================================

def bubble_sort(request):
    return render(
        request,
        'lab/bubble_sort.html'
    )


def bubble_sort_visualization(request):
    return render(
        request,
        'lab/bubble_sort_visualization.html'
    )


# =========================================
# SELECTION SORT
# =========================================

def selection_sort(request):
    return render(
        request,
        'lab/selection_sort.html'
    )


def selection_sort_visualization(request):
    return render(
        request,
        'lab/selection_sort_visualization.html'
    )


# =========================================
# INSERTION SORT
# =========================================

def insertion_sort(request):
    return render(
        request,
        'lab/insertion_sort.html'
    )


def insertion_sort_visualization(request):
    return render(
        request,
        'lab/insertion_sort_visualization.html'
    )


# =========================================
# MERGE SORT
# =========================================

def merge_sort(request):
    return render(
        request,
        'lab/merge_sort.html'
    )


def merge_sort_visualization(request):
    return render(
        request,
        'lab/merge_sort_visualization.html'
    )


# =========================================
# QUICK SORT
# =========================================

def quick_sort(request):
    return render(
        request,
        'lab/quick_sort.html'
    )


def quick_sort_visualization(request):
    return render(
        request,
        'lab/quick_sort_visualization.html'
    )

# ==============================
# TREE
# ==============================

def tree(request):
    return render(
        request,
        'lab/tree.html'
    )


# ==============================
# BINARY SEARCH TREE
# ==============================

def bst_visualization(request):
    return render(
        request,
        'lab/bst_visualization.html'
    )


# ==============================
# TREE TRAVERSAL
# ==============================

def traversal_visualization(request):
    return render(
        request,
        'lab/traversal_visualization.html'
    )


# ==============================
# B TREE
# ==============================

def b_tree_visualization(request):
    return render(
        request,
        'lab/b_tree_visualization.html'
    )


# ==============================
# B+ TREE
# ==============================

def b_plus_tree_visualization(request):
    return render(
        request,
        'lab/b_plus_tree_visualization.html'
    )

# ==============================
# CODE EXECUTION
# ==============================

@csrf_exempt
def run_code(request):

    if request.method != "POST":
        return JsonResponse({
            "success": False,
            "output": "Only POST request is allowed."
        }, status=405)

    try:
        data = request.POST

        code = data.get("code", "")
        language = data.get("language", "c")

        if not code.strip():
            return JsonResponse({
                "success": False,
                "output": "Please write some code first."
            })

        # Temporary folder
        with tempfile.TemporaryDirectory() as temp_dir:

            # ==========================
            # C
            # ==========================

            if language == "c":

                source_file = os.path.join(temp_dir, "main.c")
                exe_file = os.path.join(temp_dir, "main.exe")

                with open(source_file, "w", encoding="utf-8") as f:
                    f.write(code)

                compile_result = subprocess.run(
                    ["gcc", source_file, "-o", exe_file],
                    capture_output=True,
                    text=True,
                    timeout=10
                )

                if compile_result.returncode != 0:
                    return JsonResponse({
                        "success": False,
                        "output": compile_result.stderr
                    })

                run_result = subprocess.run(
                    [exe_file],
                    capture_output=True,
                    text=True,
                    timeout=5
                )

                output = run_result.stdout

                if run_result.stderr:
                    output += "\n" + run_result.stderr

                return JsonResponse({
                    "success": True,
                    "output": output
                })


            # ==========================
            # C++
            # ==========================

            elif language == "cpp":

                source_file = os.path.join(temp_dir, "main.cpp")
                exe_file = os.path.join(temp_dir, "main.exe")

                with open(source_file, "w", encoding="utf-8") as f:
                    f.write(code)

                compile_result = subprocess.run(
                    ["g++", source_file, "-o", exe_file],
                    capture_output=True,
                    text=True,
                    timeout=10
                )

                if compile_result.returncode != 0:
                    return JsonResponse({
                        "success": False,
                        "output": compile_result.stderr
                    })

                run_result = subprocess.run(
                    [exe_file],
                    capture_output=True,
                    text=True,
                    timeout=5
                )

                output = run_result.stdout

                if run_result.stderr:
                    output += "\n" + run_result.stderr

                return JsonResponse({
                    "success": True,
                    "output": output
                })


            # ==========================
            # JAVA
            # ==========================

            elif language == "java":

                source_file = os.path.join(temp_dir, "Main.java")

                with open(source_file, "w", encoding="utf-8") as f:
                    f.write(code)

                compile_result = subprocess.run(
                    ["javac", source_file],
                    capture_output=True,
                    text=True,
                    timeout=10
                )

                if compile_result.returncode != 0:
                    return JsonResponse({
                        "success": False,
                        "output": compile_result.stderr
                    })

                run_result = subprocess.run(
                    ["java", "-cp", temp_dir, "Main"],
                    capture_output=True,
                    text=True,
                    timeout=5
                )

                output = run_result.stdout

                if run_result.stderr:
                    output += "\n" + run_result.stderr

                return JsonResponse({
                    "success": True,
                    "output": output
                })


            # ==========================
            # PYTHON
            # ==========================

            elif language == "python":

                source_file = os.path.join(temp_dir, "main.py")

                with open(source_file, "w", encoding="utf-8") as f:
                    f.write(code)

                run_result = subprocess.run(
                    [sys.executable, source_file],
                    capture_output=True,
                    text=True,
                    timeout=5
                )

                output = run_result.stdout

                if run_result.stderr:
                    output += "\n" + run_result.stderr

                return JsonResponse({
                    "success": True,
                    "output": output
                })


            # ==========================
            # INVALID LANGUAGE
            # ==========================

            else:

                return JsonResponse({
                    "success": False,
                    "output": "Unsupported language."
                })

    except subprocess.TimeoutExpired:

        return JsonResponse({
            "success": False,
            "output": "Execution timed out. Please check your code."
        })

    except FileNotFoundError as e:

        return JsonResponse({
            "success": False,
            "output": f"Compiler/interpreter not found: {str(e)}"
        })

    except Exception as e:

        return JsonResponse({
            "success": False,
            "output": f"Error: {str(e)}"
        })